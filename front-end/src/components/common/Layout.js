import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { Outlet, useLocation } from "react-router-dom";
import MyFridgeButton from "./MyFridgeButton";

const Container = styled.div`
  min-width: 768px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  main {
    flex: 1;
    min-height: calc(100vh - 306px);
  }
`;

const hiddenPathList = ["/recipe/write"];

export default function Layout(props) {
  const location = useLocation();
  const isHiddenFridge = hiddenPathList.includes(location.pathname);

  return (
    <Wrap>
      <Header />
      <Navigation />
      <main>
        <Container>
          <Outlet />
        </Container>
        {!isHiddenFridge && <MyFridgeButton />}
      </main>
      <Footer />
    </Wrap>
  );
}

export { Container };
