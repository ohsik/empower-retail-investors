export function toUSD(value: string | number): string {
  const parsedValue = typeof value === 'string' ? parseFloat(value) : value

  const currentyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parsedValue);

  return currentyFormat
}