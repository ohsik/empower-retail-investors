import { Option } from "../../types";

// Adding profit and loss values to the trade if occured
type OptionsWithPLType = Option & {
  profitOrLoss?: number;
}

type HoldingsType = {
  [key: string]: {
    quantity: number;
    avgPrice: number;
    profitOrLoss: number;
    isMulitiLegsOpeningOrder: boolean;
  }
}

export function optionsProfitLossCalculator(orders: Option[]): OptionsWithPLType[] {

  let results: OptionsWithPLType[] = []
  let holdings: HoldingsType = {}

  const cloneOrders = structuredClone(orders);

  cloneOrders.reverse().forEach((order: Option) => {

    let profitOrLoss = 0
    let tradePL = 0

    order.legs.forEach((leg) => {
      const optionKey = `${order.symbol}+${leg.strikePrice}+${leg.optionType}+${leg.expirationDate}` // e.g. AMZN+93.0000+call+2022-12-16

      // orderPositionSide
      // e.g. sell+open, sell+close, buy+open, buy+close, expiration+close, exercise+close, assignment+close
      const orderPositionSide = `${leg.side}+${leg.positionEffect}` 

      const orderExecutionPrice = leg.executionPrice * 100;
      const orderQuantity = leg.quantity;

      // If optionsKey exist, keep track of quantity, profit, loss, avgPrice
      if(optionKey in holdings) {

        // Each trade should have it's own P/L. Resetting it for every trades
        holdings[optionKey].profitOrLoss = 0

        // If buying more of the same option
        if(leg.positionEffect === 'open') {
          const newQuantity = holdings[optionKey].quantity + orderQuantity
          const newAvgPrice = ((holdings[optionKey].avgPrice * holdings[optionKey].quantity) + (orderExecutionPrice * orderQuantity)) / newQuantity

          holdings[optionKey].avgPrice = newAvgPrice
          holdings[optionKey].quantity = newQuantity

          // When selling the option, calculate the profit
          if(orderPositionSide === 'sell+open') {
            tradePL = orderExecutionPrice * orderQuantity
            holdings[optionKey].profitOrLoss += tradePL
          }

        } else {
          // Closing the existing potision starts here

          // It's okay to skip bad data cause Robinhood API is not perfect 
          // Because We can't close order when there's no options to close
          if(holdings[optionKey].quantity === 0) {
            holdings[optionKey].quantity = 0
            holdings[optionKey].avgPrice = 0
            holdings[optionKey].profitOrLoss = 0
            return
          }

          // TODO: double check the tradePL calculation here.
          const diffPrice = orderExecutionPrice - holdings[optionKey].avgPrice
          tradePL = diffPrice * orderQuantity

          if(orderPositionSide === 'buy+close') {
            tradePL = orderExecutionPrice * orderQuantity
            tradePL = -tradePL
          }

          const newQuantity = holdings[optionKey].quantity - orderQuantity

          // Closed all holding option positions, avgPrice is no longer needed
          if(newQuantity === 0) {
            holdings[optionKey].avgPrice = 0
          }

          holdings[optionKey].profitOrLoss += tradePL
          holdings[optionKey].quantity = newQuantity
        }

      } else {

        // When selling the option, calculate the profit
        tradePL = orderPositionSide === 'sell+open' ? orderExecutionPrice * orderQuantity : 0

        // This specific option is traded for the first time
        holdings[optionKey] = {
          quantity: orderQuantity,
          avgPrice: orderExecutionPrice,
          profitOrLoss: tradePL,
          isMulitiLegsOpeningOrder: order.legs.length > 1,
        }
      }

      // Save accumulated profit or loss
      profitOrLoss += holdings[optionKey].profitOrLoss
    })

    // When profit or loss occured mark them on the trade on profitOrLoss
    const profitOrLossWithFee = profitOrLoss - order.fees;
    results = [{ ...order, profitOrLoss: profitOrLossWithFee }, ...results]
  })

  return results
}