import { Brokerages } from "./brokerages"

/*
  Always use this file to get the Chrome local storage variable names
  Do NOT define them in the component files
*/
export function localFetchedDataName(currentBrokerage: Brokerages | undefined): string {
  return `fetchedData-${currentBrokerage}`
}

export function localAuthTokenName(currentBrokerage: Brokerages | undefined): string {
  return `authToken-${currentBrokerage}`
}