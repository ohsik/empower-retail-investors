import { Data } from "../../types";

// fetchedData is Robnhood's data
// Data is the data format we want to use in the application
export function dataTransform(fetchedData: any): Data {
  console.log(fetchedData)

  // TODO: convert the data to the Data format

  return {
    stocks: fetchedData.data.orders.results,
    options: fetchedData.data.options.results,
    crypto: fetchedData.data.crypto.results,
    dividends: fetchedData.data.dividends.results,
    fees: fetchedData.data.subscription_fees.results,
    timeSynced: fetchedData.timeSynced
  }
}