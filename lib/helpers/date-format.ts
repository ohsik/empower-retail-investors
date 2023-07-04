export function formatDateTime(date: string | Date) {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  })
  
  return formattedDate;
}

export function formatDate(date: string | Date) {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour12: true
  })
  
  return formattedDate;
}