import { Crypto } from "../../types";

type HoldingsType = {
  [key: string]: {
    quantity: number;
    avgPrice: number;
    profitOrLoss: number;
  }
}

export function cryptoProfitLossCalculator(stocks: Crypto[]): Crypto[] {

  let holdings: HoldingsType = {};
  let results: Crypto[] = [];

  const cloneOrders = structuredClone(stocks);

  cloneOrders.reverse().forEach((order: Crypto) => {

    let profitOrLoss = 0;

    const cryptoSymbol = order.symbol;
    const orderQuantity = order.quantity;
    const orderExecutionPrice = order.price;

    if(cryptoSymbol in holdings) {

      // Update quantity of the stocks
      const newQuantity = order.side === 'sell' ? holdings[cryptoSymbol].quantity - orderQuantity : holdings[cryptoSymbol].quantity + orderQuantity

      if(order.side === 'buy') {
        if (holdings[cryptoSymbol].quantity === 0){
          holdings[cryptoSymbol].profitOrLoss = 0
        }

        // Get the new avgPrice with newly bought stocks
        const newTotalAmountHolding = (holdings[cryptoSymbol].avgPrice * holdings[cryptoSymbol].quantity) + (orderExecutionPrice * orderQuantity);

        holdings[cryptoSymbol].quantity = newQuantity
        holdings[cryptoSymbol].avgPrice = newTotalAmountHolding / newQuantity

      } else {
        // When sell stocks. Also when P/L occurs

        // TODO: free stocks should be calculated(no buy order on free stocks lol)
        // It's okay to skip bad data cause Robinhood API is not perfect 
        // e.g. Can't sell order when there's no options to sell
        if (holdings[cryptoSymbol].quantity === 0) {
          holdings[cryptoSymbol].quantity = 0
          holdings[cryptoSymbol].avgPrice = 0
          holdings[cryptoSymbol].profitOrLoss = 0
          return
        }

        let tradePL = 0

        // calculate P/L
        const diffPrice = orderExecutionPrice - holdings[cryptoSymbol].avgPrice
        tradePL = diffPrice * orderQuantity

        if(newQuantity === 0) {
          holdings[cryptoSymbol].avgPrice = 0
        }

        holdings[cryptoSymbol].quantity = newQuantity
        holdings[cryptoSymbol].profitOrLoss = tradePL
      }

    } else {
      // This specific option traded for the first time
      holdings[cryptoSymbol] = {
        quantity: orderQuantity,
        avgPrice: orderExecutionPrice,
        profitOrLoss: 0,
      }
    }

    // Save accumulated profit or loss
    profitOrLoss = holdings[cryptoSymbol].profitOrLoss

    // When profit or loss occured mark them on the trade on profitOrLoss
    results = [{ ...order, profitOrLoss }, ...results]
  });


  return results;
}