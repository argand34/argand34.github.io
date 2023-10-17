import styled from "@emotion/styled";
import { MAIN_THEME_COLOR } from "../../libs/const/color";

export const CalendarWrap = styled.div`
  // width: 300px;
  margin: auto;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: ${MAIN_THEME_COLOR[1]};
  color: #fff;
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
  }
`;

export const CalendarDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 10px;
  background-color: #f5f5f5;
  .calendar-day-header,
  .calendar-day-empty {
    text-align: center;
    padding: 8px;
    background-color: #eee;
    color: #666;
  }
  .calendar-day {
    text-align: center;
    padding: 8px;
    background-color: #fff;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .calendar-day:hover {
    background-color: #f0f0f0;
  }

  .calendar-day.selected {
    background-color: ${MAIN_THEME_COLOR[1]};
    color: #fff;
  }
`;
