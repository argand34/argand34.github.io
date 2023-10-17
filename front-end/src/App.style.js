import { css } from "@emotion/react";
import reset from "styled-reset";

const resetFont = `"Pretendard Variable", Pretendard, -apple-system,
  BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
  "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`;

export const resetStyles = css`
  ${reset}
  html,body, #root {
    min-height: 100%;
  }
  body,
  input,
  textarea,
  button {
    font-family: ${resetFont};
  }
`;
