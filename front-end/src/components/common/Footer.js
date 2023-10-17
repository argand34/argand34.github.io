import React from "react";
import { Container } from "./Layout";
import * as S from "./Footer.style";

function Footer(props) {
  return (
      <S.FooterBox>
        <Container>
          <S.FooterText>
            (주)우리집냉슐랭 ｜대표자명 : 앨리스 ｜사업자등록번호 : 101-10-0101｜통신판매업신고 : 서울강남 - 010 <br />
            주소 : 서울특별시 강남구 선릉로 433, 신관 6층 ｜고객센터 : 3401-2173 (월~금 09:00 ~ 18:00, 토/일 공휴일 휴무) ｜ 이메일 : OURNAENG@elice.io<br />
            COPYRIGHT © OURNAENG. ALL RIGHTS RESERVED 
          </S.FooterText>
        </Container>
      </S.FooterBox>
  );
}

export default Footer;
