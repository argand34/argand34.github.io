import React from "react";

function CloseIcon({ color }) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 1.58398L21.4985 21.0825"
        stroke={color}
        strokeWidth="3.58593"
      />
      <path
        d="M21.498 1.58398L1.99955 21.0825"
        stroke={color}
        strokeWidth="3.58593"
      />
    </svg>
  );
}

export default CloseIcon;
