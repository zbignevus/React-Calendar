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
    viewedDate,
    rangeBeginning,
    rangeEnding,
    onClick
  } = props;
  const viewedYear = viewedDate.getFullYear();
  const viewedMonth = viewedDate.getMonth();


  const days = [];

  const monthLength = getMonthLength(viewedDate);

  const earlierDate = rangeBeginning && rangeEnding ? getEarlierDate(
    rangeBeginning,
    rangeEnding,
  ).getTime() : null;

  const laterDate = rangeBeginning & rangeEnding ? getLaterDate(
    rangeBeginning,
    rangeEnding,
  ).getTime() : null;



  for (let i = 1; i <= monthLength; i++) {
    //FOR CONDITIONAL STYLING

    const currentDate = new Date(viewedYear, viewedMonth, i).getTime();

    //DAY WILL BE MARKED IF WITHIN SELECTED RANGE
    const isInRange =
      rangeBeginning && rangeEnding && earlierDate <= currentDate && currentDate <= laterDate;


    //DAY WILL BE MARKED DIFFERENTLY IF FIRST OR LAST WITHIN RANGE
    const isTheRangeLimit =
      earlierDate && laterDate && (earlierDate === currentDate || laterDate === currentDate);

    //DAY WILL BE MARKED DIFFERENTLY IF CLICKED ON
    const isActive = (rangeBeginning && rangeBeginning.getTime()) === currentDate;

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
