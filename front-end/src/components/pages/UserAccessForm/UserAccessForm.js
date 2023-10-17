import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import requestApi from "../../../libs/const/api";
import * as S from "./UserAccessForm.style";
import chef1 from "../../../assets/img/chef1.png";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { setUserIngrData } from "../../../libs/utils/fridgeIngrSlice";

function UserAccessForm(props) {
  const { inputs, text, subText, showBtn } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);
  const [time, setTime] = useState(180);
  const [timeStart, setTimeStart] = useState(false);

  const dispatch = useDispatch();

  const getUserFridge = async () => {
    try {
      const response = await requestApi("get", "/myfridge");
      dispatch(setUserIngrData(response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (timeStart && time > 0) {
      const timeInterval = setInterval(() => {
        setTime((prevTime) => (prevTime === 1 ? 0 : prevTime - 1));
      }, 1000);
      return () => {
        clearInterval(timeInterval);
      };
    }
    if (time === 0) {
      alert("인증 시간이 초과되었습니다.");
      setTime(180);
      setTimeStart(false);
    }
  }, [timeStart, time]);

  const handlePageNavigation = () => {
    const newPath = location.pathname === "/login" ? "/join" : "/login";
    navigate(newPath);
  };

  const validateNickname = (nickname) => nickname.length >= 2;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);
  const validateConfirmPassword = (password, confirmPassword) =>
    password === confirmPassword;

  const handleClick = async () => {
    try {
      if (location.pathname === "/login") {
        const response = await requestApi("post", "/login", {
          email: inputValues[0],
          password: inputValues[1],
        });

        if (response) {
          getUserFridge();
          navigate("/");
        }
      } else {
        const nickname = inputValues[0];
        const email = inputValues[1];
        const password = inputValues[3];
        const confirmPassword = inputValues[4];

        if (!validateNickname(nickname)) {
          alert("닉네임을 2글자 이상 입력해주세요.");
          inputRefs[0].current.focus();
          return;
        }

        if (!validateEmail(email)) {
          alert("유효한 이메일 주소를 입력해주세요.");
          inputRefs[1].current.focus();
          return;
        }

        if (!validatePassword(password)) {
          alert(
            "비밀번호는 최소 8글자 이상이며, 영문, 숫자, 특수문자를 모두 포함해야 합니다."
          );
          inputRefs[3].current.focus();
          return;
        }

        if (!validateConfirmPassword(password, confirmPassword)) {
          alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
          inputRefs[4].current.focus();
          return;
        }

        const response = await requestApi("post", "/join", {
          nickName: inputValues[0],
          email: inputValues[1],
          password: inputValues[3],
        });
        if (response) {
          alert("회원가입 성공");
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("에러:", error);
      if (error.response) {
        if (error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert("로그인 정보를 입력해주세요.");
        }
      }
    }
  };

  const handleInputChange = (index, value) => {
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  return (
    <S.Container>
      <S.ChefImage src={chef1} alt="요리사캐릭터" />
      <S.InputContainer>
        <S.Text style={{ cursor: "auto" }}>{text}</S.Text>
        {inputs.map((input, index) => (
          <Input
            key={index}
            text={input}
            showBtn={showBtn}
            index={index}
            onInputChange={(index, value) => handleInputChange(index, value)}
            email={inputValues[1]}
            code={inputValues[2]}
            ref={inputRefs[index] || null}
            time={time}
            setTime={setTime}
            timeStart={timeStart}
            setTimeStart={setTimeStart}
          />
        ))}
        <S.Btn onClick={() => handleClick()}>{text}</S.Btn>
        <S.Text fontSize="13px" onClick={handlePageNavigation}>
          {subText}
        </S.Text>
      </S.InputContainer>
    </S.Container>
  );
}

export default UserAccessForm;
