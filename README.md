<h1>React-Calendar</h1>

![alt text](https://raw.githubusercontent.com/zbignevus/React-Calendar/master/calendar.png)

This is a fully reusable calendar component that I have created using React, which allows you to select a calendar date range and 
returns it as two values - the earlier and the latter date ranges, both as the JavaScript Date object.

Preview <a href='https://ijf0r.csb.app/'>here</a>


<h2>Installation</h2>

Download Calendar folder from "src/components/" and place it in your React project's component directory.
Import into the file where you are planning to use it as

<code>import Calendar from '<component directory>/Calendar';</code>

<h2>Usage Instructions</h2>

The Calendar component needs to have a single attribute- rangeReturn with a function pointing to a handler function in the parent component, and has to accept two parameters - first as the beginning range, and the second as the end range.
Once you select the range on the calendar, the two range dates are passed through that handler function.

To begin a range selection, double click on a date and select the next day on which you'd like the range to end.

<h2>Code Example</h2>

<pre>
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
          Calendar rangeReturn={this.rangeReturn}
    )
}
</pre>

CodeSandbox demo <a href="https://codesandbox.io/s/holy-smoke-ijf0r?fontsize=14&hidenavigation=1&theme=dark">here</a>.
