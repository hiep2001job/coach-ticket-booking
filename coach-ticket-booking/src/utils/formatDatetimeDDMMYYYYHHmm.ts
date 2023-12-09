export function formatDatetimeDDMMYYYYHHmm(inputDateString: string) {
  const inputDate = new Date(inputDateString);

  if (isNaN(inputDate.getTime())) {
    return "Invalid Date";
  }

  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const day = inputDate.getDate();
  const month = inputDate.getMonth() + 1; // Months are zero-based, so add 1
  const year = inputDate.getFullYear();

  // Ensure single-digit numbers are padded with leading zeros
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  const formattedDate = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;

  return `${formattedDate} ${formattedTime}`;
}
