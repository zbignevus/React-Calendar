<h1>React-Calendar</h1>

<a href='https://ijf0r.csb.app/'>![alt text](https://raw.githubusercontent.com/zbignevus/React-Calendar/master/calendar.png)</a>

This is a fully reusable calendar component that I have created using React, which allows you to select a calendar date range and 
returns it as two values - the earlier and the latter date ranges, both as the JavaScript Date object.

Preview <a href='https://ijf0r.csb.app/'>here</a>


<h2>Installation</h2>

Download Calendar folder from "src/components/" and place it in your React project's component directory.
Import into the file where you are planning to use it as

<code>import Calendar from './path-to-component-folder/Calendar';</code>

<h2>Usage Instructions</h2>

The Calendar component needs to have a single attribute - dateRange that is pointing to a handler function in the parent component, and has to accept two parameters - first as the ealier date, and the second as the later date.
Once you select the range on the calendar, the two range dates are passed through that handler function.

To begin a range selection, click on a date and select the next day on which you'd like the range to end. Double-click on the same day to select the same day.

<h2>Code Example</h2>

<pre>
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
       <div>      
          Calendar dateRange={(earlierDate, laterDate) => this.setState({ earlierDate, laterDate })}
       </div>
     )
     }
</pre>
[![Edit holy-smoke-ijf0r](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/holy-smoke-ijf0r?fontsize=14&hidenavigation=1&theme=dark&view=preview)
