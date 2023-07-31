import { Stock } from "../../types";

type HoldingsType = {
  [key: string]: {
    quantity: number;
    avgPrice: number;
    profitOrLoss: number;
  }
}

export function stocksProfitLossCalculator(stocks: Stock[]): Stock[] {

  let holdings: HoldingsType = {};
  let results: Stock[] = [];

  const cloneOrders = structuredClone(stocks);

  cloneOrders.reverse().forEach((order: Stock) => {

    let profitOrLoss = 0;

    const stockSymbol = order.symbol;
    const orderQuantity = order.quantity;
    const orderExecutionPrice = order.price;

    if(stockSymbol in holdings) {

      // Update quantity of the stocks
      const newQuantity = order.side === 'sell' ? holdings[stockSymbol].quantity - orderQuantity : holdings[stockSymbol].quantity + orderQuantity

      if(order.side === 'buy') {
        if (holdings[stockSymbol].quantity === 0){
          holdings[stockSymbol].profitOrLoss = 0
        }

        // Get the new avgPrice with newly bought stocks
        const newTotalAmountHolding = (holdings[stockSymbol].avgPrice * holdings[stockSymbol].quantity) + (orderExecutionPrice * orderQuantity);

        holdings[stockSymbol].quantity = newQuantity
        holdings[stockSymbol].avgPrice = newTotalAmountHolding / newQuantity

      } else {
        // When sell stocks. Also when P/L occurs

        // TODO: free stocks should be calculated(no buy order on free stocks lol)
        // It's okay to skip bad data cause Robinhood API is not perfect 
        // e.g. Can't sell order when there's no options to sell
        if (holdings[stockSymbol].quantity === 0) {
          holdings[stockSymbol].quantity = 0
          holdings[stockSymbol].avgPrice = 0
          holdings[stockSymbol].profitOrLoss = 0
          return
        }

        let tradePL = 0

        // calculate P/L
        const diffPrice = orderExecutionPrice - holdings[stockSymbol].avgPrice
        tradePL = diffPrice * orderQuantity

        if(newQuantity === 0) {
          holdings[stockSymbol].avgPrice = 0
        }

        holdings[stockSymbol].quantity = newQuantity
        holdings[stockSymbol].profitOrLoss = tradePL
      }

    } else {
      // This specific option traded for the first time
      holdings[stockSymbol] = {
        quantity: orderQuantity,
        avgPrice: orderExecutionPrice,
        profitOrLoss: 0,
      }
    }

    // Save accumulated profit or loss
    profitOrLoss = holdings[stockSymbol].profitOrLoss

    // When profit or loss occured mark them on the trade on profitOrLoss
    const profitOrLossWithFee = profitOrLoss - order.fees;
    results = [{ ...order, profitOrLoss: profitOrLossWithFee }, ...results]
  });


  return results;
}