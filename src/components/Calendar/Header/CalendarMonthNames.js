import React, { Component } from "react";

class CalendarMonthNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthNames: [...this.props.monthNames]
    };
  }
  render() {
    const { month } = this.props;
    return <div>{this.state.monthNames[month]}</div>;
  }
}

export default CalendarMonthNames;
