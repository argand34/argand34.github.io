import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as S from "./List.style.js"; // Contents 스타일을 모두 가져옴
import axios from "axios";
import recipeDefaultImg from "../../../assets/img/recipeDefaultImg.png";
import { FillHeart, StrokeHeart } from "../../../assets/HeartIcon.js";
import requestApi from "../../../libs/const/api.js";

// function List({ foodList }) {
//     // const visibleFoods = foodList.slice(startIndex, startIndex + itemsPerPage);

function List({ recipe, isBookmarked: initialIsBookmarked, isLoggedIn }) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

  useEffect(() => {
    setIsBookmarked(initialIsBookmarked);
  }, [initialIsBookmarked]);

  const toggleLike = async (recipeId) => {
    try {
      await requestApi("post", `/toggleLikeRecipes`, { recipeId });
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      // console.log("Failed", error);
    }
  };
  const toggleBookmark = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await toggleLike(recipe._id);
  };
  return (
    <S.Card>
      <Link to={`/recipe/${recipe._id}`}>
        <S.ImgBookmark>
          <img
            // src={`/${recipe.imageUrl}`}
            src={
              recipe.imageUrl?.startsWith("/")
                ? recipe.imageUrl
                : "/" + recipe.imageUrl
            }
            alt={recipe.title}
            onError={(e) => {
              e.target.src = recipeDefaultImg;
            }}
          />
          {isLoggedIn && (
            <S.BookmarkButton
              onClick={toggleBookmark}
              isBookmarked={isBookmarked}
            >
              {isBookmarked ? (
                <FillHeart color="red" />
              ) : (
                <StrokeHeart color="red" />
              )}
            </S.BookmarkButton>
          )}
        </S.ImgBookmark>
        <S.RecipeTitle>{recipe.title}</S.RecipeTitle>
      </Link>
    </S.Card>
  );
}

export default List;
