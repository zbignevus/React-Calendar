import React, { Fragment } from "react";

import CalendarMonthNames from "./CalendarMonthNames";

const CalendarHeader = ({ yearViewed, monthViewed, handleChangeDate }) => (
  <div className="CalendarHeader">
    <div className="CalendarYear">
      <button
        onClick={() => handleChangeDate("decrease", "yearViewed")}
        className="ArrowSelect"
      >
        &#8249;
      </button>
      {yearViewed}
      <button
        onClick={() => handleChangeDate("increase", "yearViewed")}
        className="ArrowSelect"
      >
        &#8250;
      </button>
    </div>
    <div className="CalendarMonthName">
      <button
        onClick={() => handleChangeDate("decrease", "monthViewed")}
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
        month={monthViewed}
      />
      <button
        onClick={() => handleChangeDate("increase", "monthViewed")}
        className="ArrowSelect"
      >
        &#8250;
      </button>
    </div>
  </div>
);

export default CalendarHeader;
