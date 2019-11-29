import React, { Component } from "react";

import { compareDates, monthLength } from "./helpers.js";

const DayList = props => {
  const {
    monthNames,
    twiceClick,
    yearViewed,
    monthViewed,
    dateViewed,
    yearSelected,
    monthSelected,
    dateSelected,
    yearEnd,
    monthEnd,
    dateEnd,
    yearStart,
    monthStart,
    dateStart,
    onClick
  } = props;

  const daysLength = monthLength(yearViewed, monthViewed);
  const dayList = [];

  const rangeBegin = compareDates(
    yearStart,
    monthStart,
    dateStart,
    yearEnd,
    monthEnd,
    dateEnd,
    false
  );

  const rangeEnd = compareDates(
    yearStart,
    monthStart,
    dateStart,
    yearEnd,
    monthEnd,
    dateEnd,
    true
  );

  for (let i = 1; i <= daysLength; i++) {
    let currentDate = new Date(yearViewed, monthViewed, i).getTime();

    let rangeLimit =
      rangeBegin &&
      rangeEnd &&
      (rangeBegin.getTime() === currentDate ||
        rangeEnd.getTime() === currentDate);

    let isSelected =
      yearViewed === yearSelected &&
      monthViewed === monthSelected &&
      twiceClick === false &&
      i === dateSelected;

    let isActive =
      yearViewed === yearSelected &&
      monthViewed === monthSelected &&
      twiceClick === true &&
      i === dateSelected;

    let isInRange =
      (yearStart || yearStart === 0) &&
      (monthStart || monthStart === 0) &&
      dateStart &&
      (yearEnd || yearEnd === 0) &&
      (monthEnd || monthEnd === 0) &&
      dateEnd &&
      rangeBegin.getTime() <= currentDate &&
      currentDate <= rangeEnd.getTime();

    dayList.push(
      <button
        className={
          (isSelected && isInRange && "isSelectedInRange") ||
          (isSelected && "isSelected") ||
          (isActive && "isActive") ||
          (rangeLimit && "rangeLimit") ||
          (isInRange && "isInRange")
        }
        dateTime={yearViewed + "-" + (monthViewed + 1) + "-" + i}
        style={{
          gridColumn:
            i == 1 ? new Date(yearViewed, monthViewed, 1).getDay() + 1 : ""
        }}
        key={"day" + i}
        onClick={() => {
          console.log(`rangeBegin: ${rangeBegin}, \nrangeEnd:${rangeEnd}`);
          onClick(yearViewed, monthViewed, i, rangeBegin, rangeEnd);
        }}
      >
        <time>{i}</time>
      </button>
    );
  }
  return dayList;
};

export default DayList;
