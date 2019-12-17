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
    return (
      <Fragment>
        <div className="CalendarContainer">

          <Calendar date={new Date(2019,12,11)} dateRange={(earlierDate, laterDate) => this.setState({ earlierDate, laterDate })}/>

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
