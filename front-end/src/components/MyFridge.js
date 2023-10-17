import React, { useEffect, useState } from "react";
import CloseIcon from "../assets/CloseIcon";
import {
  Header,
  Content,
  EmptyFridge,
  Fridge,
  IngredientList,
  IngredientGroup,
  BtnGroup,
  CurrentIngrBox,
} from "./MyFridge.style";
import BestBeforeIcon from "../assets/img/bestBeforeIcon.svg";
import CreatedDateIcon from "../assets/img/createdDateIcon.svg";
import fridgeImg from "../assets/img/emptyFridge.svg";
import INGREDIENT_DATA from "../libs/const/ingredientData";
import requestApi from "../libs/const/api";
import Calendar from "./common/Calendar";
import PortalModal from "./common/PortalModal";
import { useNavigate, Link } from "react-router-dom";
// react-redux
import { useSelector, useDispatch } from "react-redux";
import { setUserIngrData } from "../libs/utils/fridgeIngrSlice";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "ko-KR",
    options
  );

  const [year, month, day] = formattedDate.split(".");

  return `${year}년 ${month}월 ${day}일`;
}

function MyFridge({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeAuth = useSelector((state) => state.layout.isAuth);

  // 기본 식재료 추가 모드
  const [ingrAdderMode, setIngrAdderMode] = useState(false);
  // 현재 기본 식재료
  const [ingrData, setIngrData] = useState(INGREDIENT_DATA);

  // 유저 냉장고 데이터
  const userIngrData = useSelector((state) => state.fridge.userIngrData);
  // 사용가능 식재료
  const [safeIngr, setSafeIngr] = useState([]);
  // 소비기한 마감 식재료
  const [spoiledIngr, setSpoiledIngr] = useState([]);

  // 선택한 식재료
  const [currentIngr, setCurrentIngr] = useState({});
  // 선택한 식재료 상세보기
  const [showCurrentIngr, setShowCurrentIngr] = useState(false);
  // 달력
  const [showCalendar, setShowCalendar] = useState(false);
  // 변경 소비기한 마감일
  const [newBestBefore, setNewBestBefore] = useState();

  useEffect(() => {
    currentUserFridge();
  }, [userIngrData]);

  useEffect(() => {
    // 사용 가능, 불가능 식재료 분리
    const currentDate = new Date();

    const { safe, spoiled } = userIngrData.reduce(
      (result, item) => {
        const itemDate = new Date(item.bestBefore);
        if (itemDate >= currentDate) {
          result.safe.push(item);
        } else {
          result.spoiled.push(item);
        }
        return result;
      },
      { safe: [], spoiled: [] }
    );

    setSafeIngr(safe);
    setSpoiledIngr(spoiled);
  }, [userIngrData]);

  useEffect(() => {
    setShowCalendar(false);
    setNewBestBefore(currentIngr.bestBefore);
  }, [currentIngr]);

  const currentUserFridge = () => {
    // userIngrData를 순회하면서 selected 속성 업데이트
    const updatedIngrData = ingrData.map((group) => {
      const updatedIngredients = group.ingredient.map((item) => {
        // 재료 이름이 userIngrData에 있는지 확인
        const matchingUserIngr = userIngrData.find(
          (userIngr) => userIngr.ingredientName === item.name
        );

        if (matchingUserIngr) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      });
      return { ...group, ingredient: updatedIngredients };
    });

    setIngrData(updatedIngrData);
  };

  const getUserFridge = async () => {
    try {
      const response = await requestApi("get", "/myfridge");

      dispatch(setUserIngrData(response));
      currentUserFridge();
    } catch (error) {}
  };

  const deleteIngredient = async (id) => {
    try {
      await requestApi("delete", `/myfridge/${id}`);

      setShowCurrentIngr(false);
      setShowCalendar(false);
      setNewBestBefore();
      getUserFridge();
    } catch (error) {
      console.log(error);
    }
  };

  const updateIngredient = async (id, date) => {
    try {
      await requestApi("put", `/myfridge/${id}`, {
        newBestBefore: date,
      });

      setShowCurrentIngr(false);
      setShowCalendar(false);
      setNewBestBefore();
      getUserFridge();
    } catch (error) {
      console.log(error);
    }
  };

  const addIngredient = async () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    const bestBefore = futureDate.setDate(currentDate.getDate() + 7);

    const selectedIngredients = [];
    const userIngredients = userIngrData.map(
      (userIngr) => userIngr.ingredientName
    );

    ingrData.forEach((group) => {
      group.ingredient.forEach((item) => {
        if (item.selected) {
          if (userIngredients.includes(item.name)) {
            return;
          }
          selectedIngredients.push({
            ingredientName: item.name,
            bestBefore,
          });
        } else {
          if (!userIngredients.includes(item.name)) {
            return;
          }
          const selectedItem = userIngrData.find(
            (userIngr) => userIngr.ingredientName === item.name
          );
          deleteIngredient(selectedItem._id);
        }
      });
    });

    try {
      await requestApi("post", "/myfridge", {
        ingredients: selectedIngredients,
      });

      setIngrAdderMode(false);
      setShowCurrentIngr(false);
      getUserFridge();
    } catch (error) {
      console.log(error);
    }
  };

  const searchIngrRecipe = async () => {
    const userIngredients = userIngrData.map(
      (userIngr) => userIngr.ingredientName
    );

    try {
      await requestApi("post", "/search-ingredients-recipes", {
        ingredients: userIngredients,
      });
      navigate("/recipe/all");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrentIngr = (item) => {
    setShowCurrentIngr(true);
    setCurrentIngr(item);
  };

  const handleCheckboxChange = (itemToUpdate) => {
    setIngrData((prevData) => {
      const updatedData = prevData.map((group) => {
        const updatedItems = group.ingredient.map((item) => {
          if (item === itemToUpdate) {
            return { ...item, selected: !item.selected };
          }
          return item;
        });
        return { ...group, ingredient: updatedItems };
      });
      return updatedData;
    });
  };

  return (
    <>
      <Header>
        <h3>나의 냉장고</h3>
        <button onClick={onClose}>
          <CloseIcon color="#fff" />
        </button>
      </Header>
      <Content>
        {storeAuth ? (
          ingrAdderMode ? (
            // 재료 추가하기 컴포넌트
            <IngredientList>
              <h4>
                <span>냉장고</span>를 채워보세요!
              </h4>
              {ingrData.map((group, index) => {
                return (
                  <IngredientGroup key={index}>
                    <h5>{group.type}</h5>
                    <ul className="basicIngr">
                      {group.ingredient.map((item, index) => {
                        return (
                          <li key={`ingr-${index}`}>
                            <input
                              type="checkbox"
                              id={`ingr-${item.name}`}
                              checked={item.selected}
                              onChange={() => handleCheckboxChange(item)}
                            />
                            <label htmlFor={`ingr-${item.name}`}>
                              {/* <div className="box"></div> */}
                              <span>{item.name}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </IngredientGroup>
                );
              })}
              <BtnGroup>
                <button
                  className="cancelBtn"
                  onClick={() => {
                    setIngrAdderMode(false);
                    setShowCurrentIngr(false);
                    getUserFridge();
                  }}
                >
                  돌아가기
                </button>
                <button className="addBtn" onClick={addIngredient}>
                  추가완료
                </button>
              </BtnGroup>
            </IngredientList>
          ) : (
            <>
              {userIngrData.length > 0 ? (
                // 재료 있을 때
                <Fridge>
                  <IngredientList>
                    <IngredientGroup>
                      <h5>나의 식재료</h5>
                      <ul>
                        {safeIngr.map((item) => {
                          return (
                            <li key={item._id}>
                              <button onClick={() => handleCurrentIngr(item)}>
                                {/* <div className="box"></div> */}
                                {item.ingredientName}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </IngredientGroup>
                    {spoiledIngr.length !== 0 && (
                      <IngredientGroup className="spoiledIngr">
                        <h5>소비기한 마감 식재료</h5>
                        <ul>
                          {spoiledIngr.map((item) => {
                            return (
                              <li key={item._id}>
                                <button onClick={() => handleCurrentIngr(item)}>
                                  {item.ingredientName}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </IngredientGroup>
                    )}
                    <BtnGroup>
                      {/* <button className="cancelBtn" onClick={searchIngrRecipe}>
                        레시피 검색하기
                      </button> */}
                      <button
                        className="addBtn"
                        style={{
                          background: "white",
                          color: "#F7421F",
                          border: "1px solid #F7421F",
                        }}
                        onClick={() => {
                          setIngrAdderMode(true);
                          getUserFridge();
                        }}
                      >
                        재료 추가하기
                      </button>
                    </BtnGroup>
                  </IngredientList>
                </Fridge>
              ) : (
                // 재료 없을 때
                <EmptyFridge>
                  <img src={fridgeImg} alt="빈 식재료" height={230} />
                  <h4>냉장고가 비었어요!</h4>
                  <p>
                    재료를 추가하고
                    <br />
                    바로 만들 수 있는 레시피를 확인 해보세요!
                  </p>
                  <button onClick={() => setIngrAdderMode(true)}>
                    재료 추가하기
                  </button>
                </EmptyFridge>
              )}
            </>
          )
        ) : (
          <EmptyFridge>
            <h4>우리집 냉슐랭 요리사가 아니네요!</h4>
            <p>
              로그인하여 재료를 추가하고
              <br />
              바로 만들 수 있는 레시피를 확인 해보세요!
            </p>
            <Link to="/login" onClick={onClose}>
              로그인하기
            </Link>
          </EmptyFridge>
        )}
      </Content>
      {/* <PortalModal handleShowModal={showCalendar} size={"300px"}>
        <Calendar
          thisDate={new Date(currentIngr.bestBefore)}
          onThisDate={(date) => {
            setNewBestBefore(date);
          }}
          onThisClose={() => setShowCalendar(false)}
        />
      </PortalModal> */}

      <PortalModal handleShowModal={showCurrentIngr} size={"25%"}>
        <CurrentIngrBox>
          <section className="title">
            <span>{currentIngr.ingredientName}</span>
            <button
              onClick={() => {
                setShowCurrentIngr(false);
                setShowCalendar(false);
                setNewBestBefore();
                getUserFridge();
              }}
            >
              <CloseIcon color="#fff" />
            </button>
          </section>
          <div className="date">
            <img src={CreatedDateIcon} alt="식재료 추가일" />
            <span>식재료 추가일</span>
            <span>{formatDate(currentIngr.inputDate)}</span>
          </div>
          <div className="date">
            <img src={BestBeforeIcon} alt="소비기한 마감일" />
            <span>소비기한 마감일</span>
            <button
              onClick={() => setShowCalendar((prev) => !prev)}
              disabled={new Date(currentIngr.bestBefore) < new Date()}
            >
              {newBestBefore
                ? formatDate(newBestBefore)
                : formatDate(currentIngr.bestBefore)}
            </button>
          </div>
          {showCalendar && (
            <Calendar
              thisDate={new Date(currentIngr.bestBefore)}
              onThisDate={(date) => {
                setNewBestBefore(date);
              }}
              onThisClose={() => setShowCalendar(false)}
            />
          )}

          <BtnGroup>
            {new Date(currentIngr.bestBefore) > new Date() && (
              <button
                className="addBtn"
                style={{
                  background: "white",
                  color: "#F7421F",
                  border: "1px solid #F7421F",
                }}
                onClick={() => {
                  updateIngredient(currentIngr._id, newBestBefore);
                }}
              >
                저장하기
              </button>
            )}
            <button
              className="cancelBtn"
              style={{
                background: "white",
                color: "#464646",
                border: "1px solid #464646",
              }}
              onClick={() => {
                deleteIngredient(currentIngr._id);
              }}
            >
              삭제하기
            </button>
          </BtnGroup>
        </CurrentIngrBox>
      </PortalModal>
    </>
  );
}

export default MyFridge;
