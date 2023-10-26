import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const formatToVietnameseDate = (dateString:string) => {
  // Parse the date string using the custom format 'DDMMYYYY'
  const date = dayjs(dateString, { format: 'DDMMYYYY' });

  // Map day of the week index to Vietnamese day names
  const vietnameseDaysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  
  // Get the day of the week name
  const dayOfWeek = vietnameseDaysOfWeek[date.day()];

  // Format the date in the desired format
  const formattedDate = `${dayOfWeek}, ${date.format('DD/MM')}`;

  return formattedDate;
};