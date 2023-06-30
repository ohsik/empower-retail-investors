import { Brokerages } from "./brokerages"

/*
  Always use this file to get the Chrome local storage variable names
  Do NOT define them in the component files
*/

export function localFetchedDataName(currentBrokage: Brokerages | undefined): string {
  return `fetchedData-${currentBrokage}`
}

export function localAuthTokenName(currentBrokage: Brokerages | undefined): string {
  return `authToken-${currentBrokage}`
}