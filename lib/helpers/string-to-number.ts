export function convertStringToNumber(input: string | number): number {
  return stringToNumber(Number(input).toString()) ?? 0
}

function stringToNumber(string: string): number {
  return isNaN(parseFloat(string)) ? 0 : parseFloat(string);
}