
import { stocksProfitLossCalculator } from "../../profit-loss-calculator/stocks";
import { Data, Stock } from "../../types";

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

  const stocksWithProfitOrLoss = stocksProfitLossCalculator(stocks);

  return {
    stocks: { 'all': stocksWithProfitOrLoss },
    timeSynced: fetchedData.timeSynced
  }
}