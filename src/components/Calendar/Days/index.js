import React from "react";

import { getMonthLength, getEarlierDate, getLaterDate } from "../helpers.js";

/*
  DAYS COMPONENT DESCRIPTION:

  1. Create Days array that will hold generated days.
  2. Get the length of days using getMonthLength in currently viewed calendar month(passed from parent Calendar component state).
  3. Push same amount of days buttons that getMonthLength returns for length of the month.
  4. Notify parent component when and which day button is clicked and pass it as a Date instance.
  5. conditionally style day buttons based on selection value.
  */


const Days = props => {
  const {
    viewedYear,
    viewedMonth,
    rangeBeginningYear,
    rangeBeginningMonth,
    rangeBeginningDay,
    rangeEndingYear,
    rangeEndingMonth,
    rangeEndingDay,
    onClick
  } = props;

  
  const days = [];

  const daysLength = getMonthLength(viewedYear, viewedMonth);

  const earlierDate = getEarlierDate(
    new Date(rangeBeginningYear, rangeBeginningMonth, rangeBeginningDay),
    new Date(rangeEndingYear, rangeEndingMonth, rangeEndingDay)
  );

  const laterDate = getLaterDate(
    new Date(rangeBeginningYear, rangeBeginningMonth, rangeBeginningDay),
    new Date(rangeEndingYear, rangeEndingMonth, rangeEndingDay)
  );

  for (let i = 1; i <= daysLength; i++) {
    let currentDate = new Date(viewedYear, viewedMonth, i).getTime();
    
    //FOR CONDITIONAL STYLING

    //DAY WILL BE MARKED IF WITHIN SELECTED RANGE
    let isInRange =
     (rangeBeginningYear || rangeBeginningYear === 0) &&
      (rangeBeginningMonth || rangeBeginningMonth === 0) &&
      rangeBeginningDay &&
      (rangeEndingYear || rangeEndingYear === 0) &&
      (rangeEndingMonth || rangeEndingMonth === 0) &&
      rangeEndingDay &&
      earlierDate.getTime() <= currentDate &&
      currentDate <= laterDate.getTime();
      

    //DAY WILL BE MARKED DIFFERENTLY IF FIRST OR LAST WITHIN RANGE
    let isTheRangeLimit =
      earlierDate &&
      laterDate &&
      (earlierDate.getTime() === currentDate ||
        laterDate.getTime() === currentDate);

    //DAY WILL BE MARKED DIFFERENTLY IF CLICKED ON
    let isActive = new Date(rangeBeginningYear, rangeBeginningMonth, rangeBeginningDay).getTime() === new Date(viewedYear, viewedMonth, i).getTime();

    days.push(
      <button
        className={
          (isActive ? "isActive" : undefined) ||
          (isInRange && isTheRangeLimit ? "rangeLimit" : undefined) ||
          (isInRange ? "isInRange" : undefined)
        }
        dateTime={viewedYear + "-" + (viewedMonth + 1) + "-" + i}
        style={{gridColumn: i === 1 ? new Date(viewedYear, viewedMonth, 1).getDay() + 1 : ""}}
        key={"day" + i}
        onClick={() => { onClick(new Date(viewedYear, viewedMonth, i)); }}>
        <time>{i}</time>
      </button>
    );
  }
  return days;
};

export default Days;
