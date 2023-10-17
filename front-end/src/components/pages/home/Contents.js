import React from "react";
import * as S from "./Contents.style"; // Contents 스타일을 모두 가져옴
import recipeDefaultImg from "../../../assets/img/recipeDefaultImg.png";

function Contents({ foodList }) {
  if (!foodList || (Array.isArray(foodList) && !foodList.length)) {
    return <div></div>;
  }

  return (
    <S.Section>
      {foodList.map((foods, index) => (
        <S.RecipeLink key={foods._id + index} to={`/recipe/${foods._id}`}>
          <S.ImageWrapper>
            <S.FoodImage
              src={foods.imageUrl}
              alt={foods.title}
              onError={(e) => {
                e.target.src = recipeDefaultImg;
              }}
            />
          </S.ImageWrapper>
          <p title={foods.title}>{foods.title}</p>
        </S.RecipeLink>
      ))}
    </S.Section>
  );
}

export default Contents;
