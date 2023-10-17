import styled from "@emotion/styled";
import { MAIN_THEME_COLOR } from "../../../libs/const/color";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const ChefImage = styled.img`
  width: 150px;
  height: 150px;
`;

export const Text = styled.h2`
  padding-bottom: 50px;
  font-size: ${({ fontSize }) => fontSize || "25px"};
  &:hover {
    cursor: pointer;
    border-color: orange;
  }
`;

export const InputContainer = styled.div`
  width: 550px;
  border: 1px solid #ffe9e4;
  background-color: #ffe9e4;
  border-radius: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 25px;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
`;

export const Btn = styled.button`
  width: 170px;
  height: 40px;
  margin-top: 20px;
  border-radius: 15px;
  border: 1px solid ${MAIN_THEME_COLOR[0]};
  background-color: ${MAIN_THEME_COLOR[0]};
  color: white;
  font-size: 16px;
  margin-bottom: 25px;
  right: 590px;
  &:focus {
    outline: none;
    border-color: orange;
  }
  &:hover {
    cursor: pointer;
    border-color: orange;
  }
`;
