import React from "react";
import { Container } from "./Layout";
import * as S from "./Navigation.style";

function Navigation() {
  return (
    <S.Nav>
      <Container>
        <S.NavContainer>
          <S.CustomNavLink to="/editor">냉슐랭 에디터</S.CustomNavLink>
          <S.CustomNavLink to="/recipe/popular">인기 레시피</S.CustomNavLink>
          <S.CustomNavLink to="/recipe/all">전체 레시피</S.CustomNavLink>
          <S.CustomNavLink to="/recipe/write">레시피 작성</S.CustomNavLink>
        </S.NavContainer>
      </Container>
    </S.Nav>
  );
}

export default Navigation;
