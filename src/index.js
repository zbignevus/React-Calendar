import React, { Component, Fragment } from "react";

import Calendar from "./components/Calendar";

import ReactDOM from "react-dom";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earlierDate: null,
      laterDate: null
    };
  }

  render() {
    const { earlierDate, laterDate } = this.state;
    {
      /* Calendar PROPS DESCRIPTION:
          dateRange (required) - attach a handler function from parent component to accept the earlier and later dates
          that the Calendar component will return.
          date (optional) - specify a default display date to show when the component loads. Defaults to current month.
          header-color (optional) - specify a color for the year/month calendar header. Inherits from parent by default.
          week-color (optional) - specify a color for the weeks background. Inherits from parent by default.
          day-background-color (optional) - specify a color for the days background. Has a default color.
          day-hover-color (optional) - specify a color for when hovering over a day. Has a default color.
          day-selected-color (optional) - specify a color for when selecting a day on the calendar. Has a default color.

          *Other color prop specifiers are WIP.
    */
    }
    return (
      <Fragment>
        <div className="CalendarContainer">

          <Calendar
            header-color='#765d81'
            week-color='#846d8e'
            day-background-color='#f1eef2'
            day-hover-color='#ad9db3'
            day-selected-color='#765d81'
            date={new Date(2019,11,11)}
            dateRange={(earlierDate, laterDate) => this.setState({ earlierDate, laterDate })}/>

      </div>


      {/*For demo purposes only*/}
        <br />
        <div>
          Selected range is from:
            {`${earlierDate && earlierDate.getFullYear() + "-" + (earlierDate.getMonth() + 1) + "-" + earlierDate.getDate()}
          to
            ${laterDate && laterDate.getFullYear() + "-" + (laterDate.getMonth() + 1) + "-" + laterDate.getDate()}
          `}
        </div>
      </Fragment>
    );
  }
}

const rootRef = document.getElementById("root");

ReactDOM.render(<App />, rootRef);
