import React from "react";

import CalendarMonthNames from "./CalendarMonthNames";
import CalendarWeekNames from './CalendarWeekNames';


/* CALENDARHEADER COMPONENT DESCRIPTION
  1. Accepts state values for viewed year, month and "chnageViewedDate" changing date handler function from parent (Calendar) component.
  2. Changes the currently viewed calendar month and/or year based on value it passes to changing date handler function to the parent (Calendar) component).

  *notes
    the visual component "CalendarMonthNames" allows to add an array of months(needs to be in actual order).
    This is needed should the user want to have months displayed in a different language.
*/

const CalendarHeader = ({ viewedYear, viewedMonth, changeViewedDate }) => (
  <div className="CalendarHeader">
    <div className="CalendarYear">
      <button
        onClick={() => changeViewedDate("PREVIOUS_YEAR")}
        className="ArrowSelect"
      >
        &#8249;
      </button>
      {viewedYear}
      <button
        onClick={() => changeViewedDate("NEXT_YEAR")}
        className="ArrowSelect"
      >
        &#8250;
      </button>
    </div>
    <div className="CalendarMonthName">
      <button
        onClick={() => changeViewedDate("PREVIOUS_MONTH")}
        className="ArrowSelect"
      >
        &#8249;
      </button>
      <CalendarMonthNames
        monthNames={[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ]}
        month={viewedMonth}
      />
      <button
        onClick={() => changeViewedDate("NEXT_MONTH")}
        className="ArrowSelect"
      >
        &#8250;
      </button>
    </div>
  </div>
);

export default CalendarHeader;
export {CalendarWeekNames};
