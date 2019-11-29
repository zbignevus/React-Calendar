#React Calendar

This is a fully reusable calendar component that I have created using React, which allows you to select a calendar date range and 
returns it as two values - the earlier and the latter date ranges, both as the JavaScript Date object.

#Usage Instructions:

1. Download the Calendar folder to your project's src directory.
2. The Calendar component needs to have a single attribute- rangeReturn. The handler function has to be in the parent component, and
has to accept two parameters - first as the beginning range, and the second as the end range.
3. Once you select the range on the calendar, the two range dates are passed through that handler function.

To begin a range selection, double click on a date and select the next day on which you'd like the range to end.


CodeSandbox demonstration here https://codesandbox.io/s/holy-smoke-ijf0r?fontsize=14&hidenavigation=1&theme=dark
