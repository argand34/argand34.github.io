import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import requestApi from "../../libs/const/api";
import CloseIcon from "../../assets/CloseIcon";
import * as S from "./ModalBox.style.js";
import { useDispatch } from "react-redux";
import { setAuth } from "../../libs/utils/layoutSlice";

function ModalBox(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    if (location.pathname === "/mypage") {
      try {
        const response = await requestApi("post", "/confirm-password", {
          password: password,
        });
        if (response) {
          navigate("/mypage/info");
        }
      } catch (error) {
        alert(error.response.data.error);
      }
    } else {
      try {
        const response = await requestApi("delete", "/myinfo", {
          password: password,
        });
        if (response) {
          alert("회원탈퇴 처리가 완료되었습니다.");
          dispatch(setAuth(false));
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <S.ModalContainer>
      <S.CloseBtn onClick={props.closeModal}>
        <CloseIcon color="black" />
      </S.CloseBtn>
      <S.Text fontSize="25px">{props.text}</S.Text>
      <S.Text>{props.text} 하시려면 비밀번호를 입력해주세요.</S.Text>
      <S.Label>비밀번호</S.Label>
      <S.Input type="password" onChange={handlePasswordChange} />
      <S.ModalBtn onClick={handleClick}>확인</S.ModalBtn>
    </S.ModalContainer>
  );
}

export default ModalBox;
