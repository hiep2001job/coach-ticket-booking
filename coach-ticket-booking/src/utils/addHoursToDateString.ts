export function addHoursToDateString(dateString: string, hoursToAdd: number) {
  // Parse the date string into a Date object
  const date = new Date(dateString);
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  // Add the specified number of hours
  date.setHours(date.getHours() + hoursToAdd);
  // Format the resulting date as "hh:mm"
  const formattedTime = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedTime;
}
