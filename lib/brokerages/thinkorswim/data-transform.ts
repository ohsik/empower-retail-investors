// import { cryptoProfitLossCalculator } from "../../profit-loss-calculator/crypto";
// import { optionsProfitLossCalculator } from "../../profit-loss-calculator/options";
import { stocksProfitLossCalculator } from "../../profit-loss-calculator/stocks";
import { Data, Stock, Option, Crypto, Dividend, Fee } from "../../types";

/*
  fetchedData is Thinkorswim's data
  Data is the data format we want to use in the application
*/

export function dataTransform(fetchedData: any): Data {
  // console.log({fetchedData})

  // Stocks data transformation
  const stocks: Stock[] = fetchedData.data.orders
  .map((stock: any) => {
    return { 
      id: stock.orderId,
      symbol: stock.orderLegCollection[0].instrument.symbol,
      price: stock.price,
      quantity: stock.quantity,
      fees: 0,
      side: stock.orderLegCollection[0].instruction,
      executionDate: stock.enteredTime,
    }
  });

  /*
    Adding ProfitOrLoss on Stocks, Options, and Crypto
  */
  const stocksWithProfitOrLoss = stocksProfitLossCalculator(stocks);

  return {
    stocks: { 'all': stocksWithProfitOrLoss },
    options: { 'all': [] },
    crypto: { 'all': [] },
    dividends: { 'all': [] },
    marginInterest: { 'all': [] },
    subscriptionFees: { 'all': []},
    timeSynced: fetchedData.timeSynced
  }
}