import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MAIN_THEME_COLOR } from "../libs/const/color";

const commonStyle = css({
  padding: "1.5rem 2rem",
});

export const Header = styled.header`
  ${commonStyle}
  color: #fff;
  background-color: ${MAIN_THEME_COLOR[1]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 22px;
    font-weight: 900;
  }
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  ${commonStyle}
`;

export const IngredientList = styled.div`
  max-height: 50vh;
  overflow: scroll;
  h4 {
    text-align: center;
    color: ${MAIN_THEME_COLOR[1]};
    font-weight: 900;
    font-size: 20px;
    span {
      color: ${MAIN_THEME_COLOR[0]};
    }
  }
`;

export const IngredientGroup = styled.div`
  margin-bottom: 24px;
  h5 {
    color: #b0b0b0;
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 14px;
  }
  ul {
    padding: 20px;
    border: 1px solid #b0b0b0;
    border-radius: 14px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    &.basicIngr {
      input {
        display: none;
        & + label {
          cursor: pointer;
          color: #b0b0b0;
          width: 100%;
          display: block;
          padding: 8px 0;
          border-radius: 999px;
          box-shadow: 0px 3px 9px -3px;
          .box {
            background-color: #b0b0b0;
            width: 80px;
            height: 80px;
            border-radius: 999px;
            margin: 0 auto 10px;
          }
        }
        &:checked + label {
          color: #fff;
          background: ${MAIN_THEME_COLOR[0]};
          .box {
            background-color: ${MAIN_THEME_COLOR[0]};
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          }
        }
      }
    }
    li {
      text-align: center;
      button {
        width: 100%;
      }
    }
  }
`;

export const Fridge = styled.div`
.spoiledIngr {
    li {
      button {
        background: #b0b0b0;
      }
    }
}
li {
  button {
    font-size: inherit;
    border: none;
    background: none;
    cursor: pointer;
    color: #fff;
    padding: 6.5px 0;
    border-radius: 999px;
    background: ${MAIN_THEME_COLOR[0]};
    .box {
      background-color: ${MAIN_THEME_COLOR[0]};
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      width: 80px;
      height: 80px;
      border-radius: 999px;
      margin: 0 auto 10px;
  }
}
`;

export const EmptyFridge = styled.div`
  color: ${MAIN_THEME_COLOR[1]};
  text-align: center;
  img {
    margin: 0 auto;
    display: block;
    padding-right: 40px;
  }
  h4 {
    font-size: 24px;
    margin: 20px 0 30px;
    font-weight: 700;
  }
  p {
    font-size: 18px;
    line-height: 1.3;
    margin-bottom: 40px;
  }
  button,
  a {
    background: ${MAIN_THEME_COLOR[0]};
    border: none;
    font-size: 16px;
    color: #fff;
    border-radius: 10px;
    padding: 8px 50px;
    cursor: pointer;
    margin-bottom: 10px;
    display: inline-block;
    text-decoration: none;
  }
`;

export const BtnGroup = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #b0b0b0;
  padding: 20px 0 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  button {
    border: none;
    background: none;
    font-size: 16px;
    color: #fff;
    border-radius: 10px;
    padding: 8px 20px;
    cursor: pointer;
    text-decoration: none;
    &.addBtn {
      background: ${MAIN_THEME_COLOR[0]};
    }
    &.cancelBtn {
      background: ${MAIN_THEME_COLOR[1]};
    }
  }
`;

export const CurrentIngrBox = styled.div`
  ${commonStyle}
  section.title {
    position: relative;
    span {
      color: #fff;
      background: ${MAIN_THEME_COLOR[0]};
      border-radius: 999px;
      box-shadow: 0px 3px 9px -3px;
      flex: 1;
      text-align: center;
      padding: 10px;
      font-size: 24px;
      display: block;
      font-weight: 600;
    }
    button {
      border: none;
      background: none;
      cursor: pointer;
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      svg {
        width: 18px;
      }
    }
  }
  div.date {
    display: flex;
    margin: 20px 0;
    font-size: 18px;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
    img {
      flex: 1;
    }
    img + span {
      flex: 10;
      & + span {
        font-variant-numeric: tabular-nums;
      }
    }
    button {
      font-size: inherit;
      border: 1px solid ${MAIN_THEME_COLOR[0]};
      cursor: pointer;
      background: #f7411f1a;
      color: ${MAIN_THEME_COLOR[0]};
      padding: 10px;
      font-variant-numeric: tabular-nums;
      border-radius: 10px;
      &:disabled {
        background: #d8d8d8;
        border-color: #464646;
      }
    }
  }
`;
