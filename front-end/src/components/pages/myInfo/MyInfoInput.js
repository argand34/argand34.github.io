import React, { useState } from "react";
import * as S from "./MyInfoInput.style";

function Input(props) {
  const {
    text,
    type,
    placeholder,
    showBtn,
    onChange,
    value,
    onBtnClick,
    readOnly,
  } = props;

  const [btnText, setBtnText] = useState("변경하기");
  const [read, setRead] = useState(readOnly);
  const [inputPlaceHolder, setInputPlaceHolder] = useState(placeholder);

  const handleButtonClick = () => {
    setBtnText(btnText === "변경하기" ? "임시저장" : "변경하기");
    setRead(!read);

    if (text === "비밀번호") {
      setInputPlaceHolder(
        inputPlaceHolder === "변경하시려면 변경하기 버튼을 눌러주세요."
          ? "비밀번호 입력해주세요"
          : "변경하시려면 변경하기 버튼을 눌러주세요."
      );
      onBtnClick();
      setRead(!read);
    }
  };

  return (
    <S.InputContainer>
      <S.Label>{text}</S.Label>
      <S.Input
        type={type}
        placeholder={inputPlaceHolder}
        readOnly={read}
        onChange={onChange}
        value={value}
      />
      {showBtn && <S.Button onClick={handleButtonClick}>{btnText}</S.Button>}
    </S.InputContainer>
  );
}

export default Input;
