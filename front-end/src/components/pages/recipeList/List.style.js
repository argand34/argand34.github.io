import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Card = styled.div`
  cursor: pointer;
  width: 176px;
  height: 182px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* background-color: cornsilk; */
  margin: 10px 30px 16px 30px;

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    color: #f7411f;
  }
`;
// export const RecipeImg = styled.img`
//   height: 150px;
//   width: 100%;
//   margin-bottom: 5px;
//   border-radius: 10px;
//   box-sizing: border-box;
//   background-color: #f0f0f0;
//   border: 2px solid ${MAIN_THEME_COLOR[2]};
//   cursor: pointer;
// `;
export const ImgBookmark = styled.div`
  display: flex;
  position: relative;
  img {
    width: 100%;
    height: 150px;
    border-radius: 10px;
    box-sizing: border-box;
    z-index: -1;
    object-fit: cover;
  }
  button {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

export const RecipeTitle = styled.p`
  text-align: center;
  margin-top: 16px;
  line-height: 17px;

  font-size: 14px;
  font-weight: 700;

  width: 176px;
  overflow: hidden;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const BookmarkButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  animation: ${(props) =>
    props.isBookmarked ? "heartAnimation 0.3s ease" : "none"};

  @keyframes heartAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
`;
