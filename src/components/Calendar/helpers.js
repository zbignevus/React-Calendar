export function getEarlierDate(date1, date2) {
  return date1 < date2 ? date1 : date2;
}

export function getLaterDate(date1, date2) {
  return date1 > date2 ? date1 : date2;
}

export function getMonthLength(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
