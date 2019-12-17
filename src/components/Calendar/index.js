import React, { Fragment, Component } from "react";
import { getLaterDate, getEarlierDate } from "./helpers";
import CalendarHeader, { CalendarWeekNames } from "./Header";
import Days from "./Days";
import "./style.css";

/*
  CALENDAR COMPONENT DESCRIPTION:

  1. Creates an initial date using Date class instance and assigns it's values into 
     initial state (as string values) as the viewed year/month/day, and also has the same values initially 
     assigned into beginning range date.
  2. Passes these values as props to child CalendarHeader(that displays year/month) and Days(that lists days) components.
  
  State is changed in the following way:
    1. Days component passes Date value through handleClick function once a particular day is selected. 
    2. Once a date is selected, handleClick checks whether a beginning range already has values. If so, assigns clicked date
    into ending range date (thus creating a full date range). If a full date range already existed, it nullifies previous values
    and assigns the new beginning range date. 
    3. CalendarHeader component passes the year/month and action from CalendarHeader child component through handleChangeViewedDate function.
 */

const initialDate = new Date();

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewedYear: initialDate.getFullYear(),
      viewedMonth: initialDate.getMonth(),
      viewedDay: initialDate.getDate(),
      rangeBeginningYear: initialDate.getFullYear(),
      rangeBeginningMonth: initialDate.getMonth(),
      rangeBeginningDay: initialDate.getDate(),
      rangeEndingYear: null,
      rangeEndingMonth: null,
      rangeEndingDay: null
    };
  }

  /*
    HANDLECLICK DESCRIPTION:
      1. SETS YEAR/MONTH/DATE VALUE FROM PASSED currentlyClickedDate OBJECT ARGUMENT
      2. GETS LAST CLICKED DATE'S VALUE FROM STATE AND ASSIGNS IT TO previouslySelectedDate as DATE INSTANCE.
      3. SETS EARLIER(earlierDate) AND LATER(laterDate) DATE BY COMPARING LAST CLICKED AND CURRENTLY CLICKED DATE'S VALUE.
     
   */
  handleClick = currentlyClickedDate => {
    const {
      rangeBeginningYear,
      rangeBeginningMonth,
      rangeBeginningDay,
      rangeEndingYear
    } = this.state;

    const previouslySelectedDate = new Date(
      rangeBeginningYear,
      rangeBeginningMonth,
      rangeBeginningDay
    );

    const currentlyClickedYear = currentlyClickedDate.getFullYear();
    const currentlyClickedMonth = currentlyClickedDate.getMonth();
    const currentlyClickedDay = currentlyClickedDate.getDate();

    const earlierDate = getEarlierDate(
      previouslySelectedDate,
      currentlyClickedDate
    );
    const laterDate = getLaterDate(
      previouslySelectedDate,
      currentlyClickedDate
    );

    //IF USER CLICKS ON A DATE WHILE ALREADY HAVING CLICKED ON ANY OTHER DATE PRIOR
    if (rangeBeginningYear) {
      this.props.dateRange(earlierDate, laterDate);
      this.setState({
        rangeEndingYear: currentlyClickedYear,
        rangeEndingMonth: currentlyClickedMonth,
        rangeEndingDay: currentlyClickedDay
      });
    } else {
      this.props.dateRange(null, null);
      this.setState({
        rangeBeginningYear: currentlyClickedYear,
        rangeBeginningMonth: currentlyClickedMonth,
        rangeBeginningDay: currentlyClickedDay
      });
    }
    //IF USER CLICKS ON ANY DATE WHILE HAVING HAD SELECTED A RANGE
    if (rangeBeginningYear && rangeEndingYear) {
      this.props.dateRange(null, null);
      this.setState({
        rangeBeginningYear: currentlyClickedYear,
        rangeBeginningMonth: currentlyClickedMonth,
        rangeBeginningDay: currentlyClickedDay,
        rangeEndingYear: null,
        rangeEndingMonth: null,
        rangeEndingDay: null
      });
    }
  };

  /*
    handleChangeViewedDate DESCRIPTION:

    SETS CALENDAR VIEWED YEAR/MONTH BASED ON ARGUMENTS PROVIDED FROM CHILD CalendarHeader COMPONENT.
    ENSURES THAT YEARS ARE TRACKED CORRECTLY WHEN TRAVERSING BETWEEN MONTHS.
  
  */

  handleChangeViewedDate = (action, prop) => {
    const { viewedYear, viewedMonth } = this.state;
    let year = viewedYear;
    let month = viewedMonth;

    //Increase action behavior and it's prop conditions
    if (action === "increase") {
      if (prop === "viewedYear") {
        year = year + 1;
      }
      if (prop === "viewedMonth") {
        if (month + 1 > 11) {
          month = 0;
          year = year + 1;
        } else {
          month = month + 1;
        }
      }
    }
    //Decrease action behavior and it's prop conditions
    if (action === "decrease") {
      if (prop === "viewedYear") {
        year = year - 1;
      }
      if (prop === "viewedMonth") {
        if (month - 1 < 0) {
          month = 11;
          year = viewedYear - 1;
        } else {
          month = month - 1;
        }
      }
    }
    this.setState({
      viewedYear: year,
      viewedMonth: month
    });
  };

  render() {
    const { viewedYear, viewedMonth } = this.state;
    return (
      <Fragment>
        <CalendarHeader
          viewedYear={viewedYear}
          viewedMonth={viewedMonth}
          changeViewedDate={this.handleChangeViewedDate}
        />
        <div className="CalendarBody">
          <div className="CalendarWeek">
            <CalendarWeekNames />
          </div>
          <div className="CalendarMonthDays">
            <Days {...this.state} onClick={this.handleClick} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Calendar;
