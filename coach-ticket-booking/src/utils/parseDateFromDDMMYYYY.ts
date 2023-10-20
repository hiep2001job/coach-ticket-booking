import dayjs from "dayjs"; // Import dayjs
export const parseDateFromDDMMYYYY = (dateString: string) => {
  const day = parseInt(dateString.substring(0, 2), 10);
  const month = parseInt(dateString.substring(2, 4), 10) - 1;
  const year = parseInt(dateString.substring(4, 8), 10);

  const dateObject = dayjs()
    .set("year", year)
    .set("month", month)
    .set("date", day);

  return dateObject;
};
