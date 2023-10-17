import React from "react";
import * as S from "./RecipeCard.style.js";


const RecipeCard = ({ recipes }) => {

    // console.log(recipes);
    return (
        <>
            {recipes.map(recipe => {
                return (
                    <S.Card key={recipe}> <a href={`/recipe/${recipe._id}`}>

                        <S.ImgBookmark key={recipe}><img src={recipe.imageUrl} alt={recipe.title} /> </S.ImgBookmark>

                        {/* <S.Bookmark onClick={() => { alert("북마크에 담음용") }}>
                            북마크
                        </S.Bookmark> */}

                        <S.RecipeTitle>
                            {recipe.title}
                        </S.RecipeTitle>
                    </a>
                    </S.Card>

                )
            })}

        </>
    );
}

export default RecipeCard;

