import styled from "@emotion/styled";

export const Label = styled.label`
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  width: 350px;
  height: 35px;
  padding-left: 8px;
  border: 1px solid #ccc;
  border-radius: 15px;
  position: relative;

  &:focus {
    outline: none;
    border-color: orange;
  }

  &:hover {
    cursor: pointer;
    border-color: orange;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  height: 25px;
  width: 60px;
  font-size: 12px;
  border-radius: 10px;
  border: 1px solid white;
  position: absolute;
  margin-top: 23px;
  margin-left: 295px;
  align-items: center;

  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
`;
