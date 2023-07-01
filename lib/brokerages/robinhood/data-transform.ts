import { Data } from "../../types";
import { Stock } from "../../types/stocks";

/*
  fetchedData is Robnhood's data
  Data is the data format we want to use in the application

  TODO: convert the data to the Data format
*/
export function dataTransform(fetchedData: any): Data {

  // Stocks data transformation
  const stocks: Stock[] = fetchedData.data.orders.results.map((stock: any) => {
    return {
      id: stock.id,
      symbol: stock.instrument,
      price: stock.average_price ?? stock.price,
      quantity: stock.quantity,
      fees: stock.fees,
      side: stock.side,
      executionDate: stock.updated_at
    };
  });
  
  return {
    stocks: stocks,
    options: fetchedData.data.options.results,
    crypto: fetchedData.data.crypto.results,
    dividends: fetchedData.data.dividends.results,
    fees: fetchedData.data.subscription_fees.results,
    timeSynced: fetchedData.timeSynced
  }
}