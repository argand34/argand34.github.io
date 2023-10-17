import React from "react";
import requestApi from "../../libs/const/api";
import { Container } from "./Layout";
import * as S from "./Header.style";
import { useDispatch, useSelector } from "react-redux";
import { setUserIngrData } from "../../libs/utils/fridgeIngrSlice";
import { setAuth } from "../../libs/utils/layoutSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const storeAuth = useSelector((state) => state.layout.isAuth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      await requestApi("post", "/logout");
      // 아래 업데이트가 실행된 뒤
      dispatch(setAuth(false));
      dispatch(setUserIngrData([]));
      // 그다음에 경로를 이동시켜주어야 합니다.
      // Link태그의 경우 handleLogout함수를 실행하기 전에 바로 이동하기 때문에
      // dispatch 업데이트적용이 되지않습니다. 그래서 button태그로 변경 후 useNavigate로 새로고침없이 경로 이동을 시켜줍니다!
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <header>
      <Container style={{ textAlign: "center" }}>
        {storeAuth ? (
          // 로그인 상태일 때
          <S.User>
            <S.JoinMypage to="/mypage">마이페이지</S.JoinMypage>
            {/* 로그아웃은 Link태그가 아니라 button태그이어야 합니다. 설명은 위에 적어두었어요. 스타일컴포넌트 태그를 button으로 변경해주세요 */}
            <S.Logout onClick={handleLogout}> 로그아웃</S.Logout>
          </S.User>
        ) : (
          // 로그인되지 않은 상태일 때
          <S.User>
            <S.JoinMypage to="/join">회원가입</S.JoinMypage>
            <S.Login to="/login">로그인</S.Login>
          </S.User>
        )}
        <S.Title to="/">
          <h1>
            우리집<span> 냉슐랭</span>
          </h1>
        </S.Title>
      </Container>
    </header>
  );
}

export default Header;
