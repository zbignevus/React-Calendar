import React, { Component, Fragment } from "react";

import Calendar from "./components/Calendar";

import ReactDOM from "react-dom";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeBegin: null,
      rangeEnd: null
    };
  }

  rangeReturn = (rangeBegin, rangeEnd) => {
    this.setState({
      rangeBegin,
      rangeEnd
    });
  };

  render() {
    const { rangeBegin, rangeEnd } = this.state;
    return (
      <Fragment>
        <div className="Calendar" style={{ width: "350px" }}>
          <Calendar rangeReturn={this.rangeReturn} />
        </div>
        <br />
        <div>
          The selected range is from:{" "}
          {`${rangeBegin &&
            rangeBegin.getFullYear() +
              "-" +
              (rangeBegin.getMonth() + 1) +
              "-" +
              rangeBegin.getDate()} to ${rangeEnd &&
            rangeEnd.getFullYear() +
              "-" +
              (rangeEnd.getMonth() + 1) +
              "-" +
              rangeEnd.getDate()}`}
        </div>
      </Fragment>
    );
  }
}

const rootRef = document.getElementById("root");

ReactDOM.render(<App />, rootRef);
