import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Section = styled.div`
  width: 1000px;
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  padding-top: 10px;
  a:hover {
    p {
      opacity: 0.7;
    }
  }

  p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 10px;
    background: #f7411f;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 8px;
    transition: 0.3s;
    font-size: 14px;
  }
`;

export const FoodImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  box-sizing: border-box;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  height:130px;
  aspect-ratio:185 : 130;
  overflow:hidden;
  border-radius: 8px;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.15);
  transition:.3s;
  &:hover {
    transform:rotate(3deg);
  }
`;
export const RecipeLink = styled(Link)`
  text-decoration: none;
  color: #464646;
  width: calc(20% - 15px);
  height: 172px;
`;

export const BookmarkButton = styled.button`
  position: absolute;
  & * {
    pointer-events: none;
  }
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
