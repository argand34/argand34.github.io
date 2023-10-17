import React, { useState } from "react";
import { CalendarWrap, CalendarHeader, CalendarDays } from "./Calendar.style";

function Calendar({ thisDate, onThisDate, onThisClose }) {
  const [selectedDate, setSelectedDate] = useState(thisDate);

  const today = new Date();
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handleDateClick = (day) => {
    const selectedDay = new Date(year, month, day);
    setSelectedDate(selectedDay);
    onThisDate(selectedDay);
    onThisClose();
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(year, month + 1, 1);
    setSelectedDate(nextMonth);
  };

  const goToPrevMonth = () => {
    if (month === today.getMonth() && year === today.getFullYear()) {
      return;
    }
    if (month === today.getMonth() + 1) {
      const lastPrevMonth = new Date(year, month - 1, today.getDate() + 1);
      setSelectedDate(lastPrevMonth);
    } else {
      const prevMonth = new Date(year, month - 1, 1);
      setSelectedDate(prevMonth);
    }
  };

  return (
    <CalendarWrap>
      <CalendarHeader>
        <button onClick={goToPrevMonth}>&#9664;</button>
        <span>
          {year}년 {month + 1}월
        </span>
        <button onClick={goToNextMonth}>&#9654;</button>
      </CalendarHeader>
      <CalendarDays>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="calendar-day-empty" />
        ))}
        {days.map((day) => {
          const date = new Date(year, month, day);
          const isPast = date < today;
          return (
            <button
              key={day}
              className={`calendar-day ${
                selectedDate.getDate() === day ? "selected" : ""
              }`}
              onClick={() => !isPast && handleDateClick(day)}
              disabled={isPast}
            >
              {day}
            </button>
          );
        })}
      </CalendarDays>
    </CalendarWrap>
  );
}

export default Calendar;
