const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const displayDate = (value: Date) => {
  let date;
  if (value instanceof Date) date = value;
  else date = new Date(value);

  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const monthInText = months[month];
  const minutes = toHoursAndMinutes(date);
  return `${monthInText} ${day}, ${year} at ${minutes} `;
};

export const toHoursAndMinutes = (date: Date) => {
  if (!date) return;
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const minutesZero = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutesZero}`;
};
