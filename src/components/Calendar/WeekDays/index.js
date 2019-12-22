import React from "react";

import './style.css';

export default function CalendarWeekDays({weekBackground}) {
  return (
    <div className="CalendarWeek" style={{background: weekBackground}}>
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </div>
  );
}
