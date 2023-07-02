import { Data } from "../../types";
import { Stock, Crypto } from "../../types";

/*
  fetchedData is Robnhood's data
  Data is the data format we want to use in the application

  TODO: convert the data to the Data format
*/
export function dataTransform(fetchedData: any): Data {
  console.log({fetchedData})

  // Stocks data transformation
  const stocks: Stock[] = fetchedData.data.orders.results.map((stock: any) => {
    return {
      id: stock.id,
      symbol: stock.symbol ?? stock.instrument,
      price: stock.average_price ?? stock.price,
      quantity: stock.quantity,
      fees: stock.fees,
      side: stock.side,
      executionDate: stock.updated_at
    };
  });

  // Options data transformation

  // Crypto data transformation
  const crypto: Crypto[] = fetchedData.data.crypto.results.map((crypto: any) => {
    const symbol = fetchedData.data.crypto_currency_pair.results.find((currency: any) => currency.id === crypto.currency_pair_id);

    return {
      id: crypto.id,
      symbol: symbol.symbol ?? crypto.currency_pair_id,
      price: crypto.average_price,
      quantity: crypto.quantity,
      fees: 0,
      side: crypto.side,
      executionDate: crypto.updated_at
    };
  });
  // Dividends data transformation

  // Margin interest data transformation

  // Subscription fees data transformation

  // user data transformation
  
  return {
    stocks: stocks,
    options: fetchedData.data.options.results,
    crypto: crypto,
    dividends: fetchedData.data.dividends.results,
    fees: fetchedData.data.subscription_fees.results,
    timeSynced: fetchedData.timeSynced
  }
}