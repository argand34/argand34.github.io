import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Section = styled.div`
  width: 1000px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  cursor: pointer;
  p {
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
    text-align: center;
  }
`;

export const ImageWrapper = styled.div`
  height: 130px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.15);
  border-radius: 100%;
  overflow: hidden;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: rotate(180deg);
  }
`;

export const EditorImage = styled.img`
  width: 100%;
  object-fit: cover;
  pointer-events: none;
  text-align: center;
`;

export const EditorLink = styled.div`
  text-decoration: none;
  color: #464646;
  transition: 0.5s;
  &:hover {
    opacity: 0.8;
  }
`;
