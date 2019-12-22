import React, { Fragment, useState } from "react";
import { getLaterDate, getEarlierDate } from "./helpers";
import CalendarHeader from "./Header";
import CalendarWeekDays from './WeekDays'
import Days from "./Days";
import "./style.css";
import styled from 'styled-components';

/*
  CALENDAR COMPONENT DESCRIPTION:

  1. Creates an initial date using Date class instance and assigns it's values into
     initial state Calendar viewed date, and also has the same values initially
     assigned into beginning range date.
  2. Passes these values as props to child CalendarHeader(that displays year/month) and Days(that lists days) components.

  State is changed in the following way:
    1. Days component passes Date value through handleClick function once a particular day is selected.
    2. Once a date is selected, handleClick checks whether a beginning range already has values. If so, assigns clicked date
    into ending range date (thus creating a full date range). If a full date range already existed, it nullifies previous values
    and assigns the new beginning range date.
    3. CalendarHeader component passes the year/month and action from CalendarHeader child component through handleChangeViewedDate function.
 */

const Calendar = ({ date, dateRange,...props  }) => {
  const [viewedDate, setViewedDate] = useState(date || new Date());
  const [rangeBeginning, setRangeBeginning] = useState(null);
  const [rangeEnding, setRangeEnding] = useState(null);

  var viewedYear = viewedDate.getFullYear();
  var viewedMonth = viewedDate.getMonth();

  /*
    HANDLECLICK DESCRIPTION:
      1. GETS EARLIER AND LATER DATE BY COMPARING THE PASSED DATE WITH THE BEGINNING RANGE DATE.
      2. IF BEGINNING AND ENDING RANGE DATES ARE TRUTHY WHEN DATE ARGUMENT PASSED, RETURNS THE RANGE AS NULL AND SETS PASSED DATE TO BEGINNING RANGE DATE
      3. IF ONLY BEGINNING RANGE EXISTED WHEN DATE ARGUMENT PASSED, RETURNS EARLIER AND LATER DATES AS RANGE AND SETS ENDING RANGE AS PASSED DATE ARGUMENT.

   */

  const handleClick = clickedDate => {
    const earlierDate = getEarlierDate(rangeBeginning, clickedDate);
    const laterDate = getLaterDate(rangeBeginning, clickedDate);

    return rangeBeginning && rangeEnding
      ? (dateRange(null, null),
        setRangeBeginning(clickedDate),
        setRangeEnding(null))
      : rangeBeginning
      ? (dateRange(earlierDate, laterDate), setRangeEnding(clickedDate))
      : (dateRange(null, null), setRangeBeginning(clickedDate));
  };

  /*
    handleChangeViewedDate DESCRIPTION:

    SETS CALENDAR VIEWED YEAR/MONTH BASED ON ARGUMENTS PROVIDED FROM CHILD CalendarHeader COMPONENT.
    ENSURES THAT YEARS ARE TRACKED CORRECTLY WHEN TRAVERSING BETWEEN MONTHS.
  */

  const handleChangeViewedDate = action => {
    switch (action) {
      case "DECREMENT_YEAR":
        viewedYear = --viewedYear;
        break;
      case "INCREMENT_YEAR":
        viewedYear = ++viewedYear;
        break;
      case "DECREMENT_MONTH":
        viewedMonth =
          viewedMonth < 0 ? (--viewedYear, (viewedMonth = 11)) : --viewedMonth;
        break;
      case "INCREMENT_MONTH":
        viewedMonth =
          viewedMonth > 11 ? (++viewedYear, (viewedMonth = 0)) : ++viewedMonth;
        break;
      default:
        break;
    }
    setViewedDate(new Date(viewedYear, viewedMonth));
  };

  /*STYLING JCSS*/

  const CalendarHeaderStyle = styled.div`
    background: ${props['header-color'] || 'inherit'}
  `;

  const CalendarWeekStyle = styled.div`
    background: ${props['week-color'] || 'inherit'}
  `;

  const CalendarBodyStyle = styled.div`
    color: #325e82;
    background: ${props['day-background-color'] || '#eef3f8'};
    button:hover, button.isInRange{
        background: ${props['day-hover-color'] || '#9abad6' };
        color: #eef3f8;
    };

    button.isActive, button.rangeLimit, button.isInRange:hover{
      background: ${props['day-selected-color'] || '#568dba'};
      color: #eef3f8;
    }
  `;

  return (
    <Fragment>
      <CalendarHeaderStyle>
        <CalendarHeader
          changeViewedDate={handleChangeViewedDate}
          viewedMonth={viewedMonth}
          viewedYear={viewedYear}
        />

    </CalendarHeaderStyle>
    <CalendarWeekStyle>
      <CalendarWeekDays/>
    </CalendarWeekStyle>
    <CalendarBodyStyle>
      <Days
        onClick={handleClick}
        rangeBeginning={rangeBeginning}
        rangeEnding={rangeEnding}
        viewedMonth={viewedMonth}
        viewedYear={viewedYear}
      />
    </CalendarBodyStyle>
    </Fragment>
  );
};

export default Calendar;
