export function formatCurrency(number:number) {
    // Convert the number to a string and reverse it to insert commas
    const formattedNumber = number.toString().split('').reverse().join('');
    
    // Use regular expressions to add commas every 3 digits
    const formattedWithCommas = formattedNumber.replace(/(\d{3})(?=\d)/g, '$1,');
    
    // Reverse the string back and append 'đ' for currency
    const result = formattedWithCommas.split('').reverse().join('') + 'đ';
  
    return result;
  }