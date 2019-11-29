import React, { Fragment, Component } from "react";
import { compareDates } from "./helpers";
import CalendarHeader from "./CalendarHeader";
import DayList from "./DayList";
import CalendarWeekNames from "./CalendarWeekNames";

import "./style.css";

const argDate = new Date();

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      yearViewed: argDate.getFullYear(),
      monthViewed: argDate.getMonth(),
      dateViewed: argDate.getDate(),
      yearSelected: argDate.getFullYear(),
      monthSelected: argDate.getMonth(),
      dateSelected: argDate.getDate(),
      yearStart: null,
      monthStart: null,
      dateStart: null,
      yearEnd: null,
      monthEnd: null,
      dateEnd: null,
      twiceClick: false
    };
  }

  handleClick = (year, month, date) => {
    const {
      yearSelected,
      monthSelected,
      dateSelected,
      yearStart,
      monthStart,
      dateStart,
      twiceClick
    } = this.state;

    const newerDate = compareDates(
      yearStart,
      monthStart,
      dateStart,
      year,
      month,
      date,
      true
    );

    const olderDate = compareDates(
      yearStart,
      monthStart,
      dateStart,
      year,
      month,
      date,
      false
    );

    //single click selection behavior
    if (twiceClick === false) {
      this.props.rangeReturn(null, null);
      if (
        yearSelected === year &&
        monthSelected === month &&
        dateSelected === date
      ) {
        this.setState({
          twiceClick: true,
          yearStart: year,
          monthStart: month,
          dateStart: date,

          yearEnd: null,
          monthEnd: null,
          dateEnd: null
        });
      } else {
        this.setState({
          yearSelected: year,
          monthSelected: month,
          dateSelected: date,
          dateStart: date,
          monthStart: month,
          yearStart: year,
          dateEnd: null,
          monthEnd: null,
          yearEnd: null
        });
      }

      //double click selection behavior
    } else if (twiceClick === true) {
      this.props.rangeReturn(
        new Date(
          olderDate.getFullYear(),
          olderDate.getMonth(),
          olderDate.getDate()
        ),
        new Date(
          newerDate.getFullYear(),
          newerDate.getMonth(),
          newerDate.getDate()
        )
      );
      this.setState({
        twiceClick: false,
        yearEnd: year,
        monthEnd: month,
        dateEnd: date,
        yearSelected: newerDate.getFullYear(),
        monthSelected: newerDate.getMonth(),
        dateSelected: newerDate.getDate()
      });
    }
  };

  //Allow selecting between years and months
  handleChangeDate = (action, prop) => {
    //setting default params
    const { yearViewed, monthViewed } = this.state;
    let month = monthViewed;
    let year = yearViewed;

    //Increase action behavior with it's prop conditions
    if (action === "increase") {
      if (prop === "yearViewed") {
        year = yearViewed + 1;
      }
      if (prop === "monthViewed") {
        if (monthViewed + 1 > 11) {
          month = 0;
          year = yearViewed + 1;
        } else {
          month = monthViewed + 1;
        }
      }
    }
    //Decrease action behavior with it's prop conditions
    if (action === "decrease") {
      if (prop === "yearViewed") {
        year = yearViewed - 1;
      }
      if (prop === "monthViewed") {
        if (monthViewed - 1 < 0) {
          month = 11;
          year = yearViewed - 1;
        } else {
          month = monthViewed - 1;
        }
      }
    }
    this.setState({
      yearViewed: year,
      monthViewed: month
    });
  };

  render() {
    const { yearViewed, monthViewed } = this.state;
    return (
      <Fragment>
        <CalendarHeader
          yearViewed={yearViewed}
          monthViewed={monthViewed}
          handleChangeDate={this.handleChangeDate}
        />
        <div className="CalendarBody">
          <div className="CalendarWeek">
            <CalendarWeekNames />
          </div>
          <div className="CalendarMonthDays">
            <DayList {...this.state} onClick={this.handleClick} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Calendar;
