export function formatDate(date: string | Date) {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  })
  
  return formattedDate;
}