import React, { useMemo, forwardRef } from "react";
import { useLocation } from "react-router-dom";
import { InputContainer, Label, UserInput, Button } from "./Input.style";
import requestApi from "../../../libs/const/api";

const isVisibleIndex = [1, 2];

const Input = forwardRef((props, ref) => {
  const {
    text,
    showBtn,
    index,
    onInputChange,
    email,
    code,
    time,
    setTime,
    timeStart,
    setTimeStart,
  } = props;

  const location = useLocation();

  const inputType =
    location.pathname === "/login"
      ? index === 1
        ? "password"
        : "text"
      : index === 3 || index === 4
      ? "password"
      : "text";

  const placeholderText =
    location.pathname === "/login"
      ? `${text} 입력해주세요.`
      : index === 0
      ? "닉네임 2글자 이상 입력해주세요."
      : `${text} 입력해주세요.`;

  const buttonVisible = useMemo(
    () => showBtn && isVisibleIndex.includes(index),
    [showBtn, index]
  );

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onInputChange(index, newValue);
  };

  const btnText = index === 1 ? "인증번호" : "인증확인";

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const secondsRemaining = time % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(
      secondsRemaining
    ).padStart(2, "0")}`;
  };

  const handleMail = async () => {
    if (index === 1 && timeStart) {
      return;
    }

    try {
      const response =
        index === 1
          ? await requestApi("post", "/request", { email })
          : await requestApi("post", "/verify", { email, code });

      if (response) {
        if (index === 1) {
          setTimeStart(true);
          alert(response);
        } else {
          alert("인증성공");
          setTime(15);
          setTimeStart(false);
        }
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <InputContainer>
      <Label htmlFor={text}>{text}</Label>
      <UserInput
        type={inputType}
        id={text}
        placeholder={placeholderText}
        onChange={handleInputChange}
        ref={ref}
      />
      {buttonVisible && (
        <Button onClick={handleMail}>
          {index === 1 && timeStart ? formatTime(time) : btnText}
        </Button>
      )}
    </InputContainer>
  );
});

export default Input;
