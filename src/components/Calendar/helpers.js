export function checkRange(selectedDate) {
  if (
    2019 <= selectedDate.getFullYear() &&
    10 <= selectedDate.getMonth() &&
    10 &&
    selectedDate.getFullYear() <= 2019 &&
    selectedDate.getMonth() <= 11 &&
    selectedDate.getDate() <= 3
  ) {
    return true;
  }
  return false;
}

export function generateDateRange(
  yearStart,
  monthStart,
  dateStart,
  yearEnd,
  monthEnd,
  dateEnd
) {
  var rangeBegin, rangeEnd;

  if (
    yearStart ||
    (yearStart === 0 && monthStart) ||
    (monthstart === 0 && dateStart) ||
    (dateStart === 0 && yearEnd) ||
    (yearEnd === 0 && (monthEnd || monthEnd === 0) && dateEnd)
  ) {
    console.log("range comparison ran.");
    const date1 = new Date(yearStart, monthStart, dateStart);
    const date2 = new Date(yearEnd, monthEnd, dateEnd);

    var rangeBegin, rangeEnd;
    if (date1 > date2) {
      rangeBegin = date2;
      rangeEnd = date1;
    } else {
      rangeBegin = date1;
      rangeEnd = date2;
    }
  }
  return [rangeBegin, rangeEnd];
}

export function compareDates(
  yearStart,
  monthStart,
  dateStart,
  yearEnd,
  monthEnd,
  dateEnd = null,
  course
) {
  var firstDate =
    (yearStart || yearStart === 0) &&
    (monthStart || monthStart === 0) &&
    (dateStart || dateStart === 0)
      ? new Date(yearStart, monthStart, dateStart)
      : null;
  var secondDate =
    (yearEnd || yearEnd === 0) &&
    (monthEnd || monthEnd === 0) &&
    (dateEnd || dateEnd === 0)
      ? new Date(yearEnd, monthEnd, dateEnd)
      : null;

  return course === true
    ? firstDate > secondDate
      ? firstDate
      : secondDate
    : firstDate > secondDate
    ? secondDate
    : firstDate;
}

export function monthLength(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
