import styled from "@emotion/styled";
import { MAIN_THEME_COLOR } from "../../libs/const/color";

export const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  z-index: 1;
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Box = styled.div(({ size }) => ({
  backgroundColor: "#fff",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0px 7px 18px 0px rgba(0, 0, 0, 0.3)",
  width: size,
}));

export const AlertBox = styled.div`
  padding: 40px;
  text-align: center;
  h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 30px;
  }
  button {
    border: none;
    background: none;
    font-size: 17px;
    color: #fff;
    border-radius: 10px;
    padding: 8px 20px;
    cursor: pointer;
    text-decoration: none;
    margin: 0 10px;
    &.cancelBtn {
      background: ${MAIN_THEME_COLOR[1]};
    }
    &.deleteBtn {
      background: ${MAIN_THEME_COLOR[0]};
    }
  }
`;
