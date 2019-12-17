export function getEarlierDate(date1, date2) {
  return date1 < date2 ? date1 : date2;
}

export function getLaterDate(date1, date2) {
  return date1 > date2 ? date1 : date2;
}

export function getMonthLength(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
