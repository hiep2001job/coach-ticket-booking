export function formatDatetimeDDMMYYYY(inputDateString: string|null) {
    if(!inputDateString) return "";
    
    const inputDate = new Date(inputDateString!);
  
    if (isNaN(inputDate.getTime())) {
      return "Invalid Date";
    }
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; // Months are zero-based, so add 1
    const year = inputDate.getFullYear();
  
    // Ensure single-digit numbers are padded with leading zeros
    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;
  
    return `${formattedDate}`;
  }
  