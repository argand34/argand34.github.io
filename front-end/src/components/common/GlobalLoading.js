import React from "react";
import Loading from "../../assets/img/loading.svg";

function GlobalLoading() {
  return (
    <div
      className="loading"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255,255,255,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "auto",
        transition: "0.5s",
        zIndex: 100,
      }}
    >
      <img src={Loading} alt="" />
    </div>
  );
}

export default GlobalLoading;
