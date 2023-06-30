import { Brokerages } from "./brokerages"

export function localFetchedDataName(currentBrokage: Brokerages | undefined): string {
  return `fetchedData-${currentBrokage}`
}

export function localAuthTokenName(currentBrokage: Brokerages | undefined): string {
  return `authToken-${currentBrokage}`
}