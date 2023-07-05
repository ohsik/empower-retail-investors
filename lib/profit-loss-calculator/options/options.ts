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
    orderPositionSide: string;
  }
}

export function optionsProfitLossCalculator(orders: Option[]): OptionsWithPLType[] {

  let results: OptionsWithPLType[] = []
  let holdings: HoldingsType = {}

  const cloneOrders = structuredClone(orders);

  cloneOrders.reverse().forEach((order: Option) => {

    let profitOrLoss = 0
    let tradePL = 0

    const orderQuantity = order.quantity;
    const orderExecutionPrice = order.premium;

    order.legs.forEach((leg) => {

      const optionKey = `${order.symbol}+${leg.strikePrice}+${leg.optionType}+${leg.expirationDate}` // e.g. AMZN+93.0000+call+2022-12-16
      const orderPositionSide = `${leg.side}+${leg.positionEffect}` // e.g. sell+open

      // If optionsKey exist, keep track of quantity, profit, loss, avgPrice
      if(optionKey in holdings) {

        // Each trade should have it's own P/L. Resetting it for every trades
        holdings[optionKey].profitOrLoss = 0

        // If buying more of the same options
        if(leg.positionEffect === 'open') {

          const newQuantity = holdings[optionKey].quantity + orderQuantity
          const newAvgPrice = ((holdings[optionKey].avgPrice * holdings[optionKey].quantity) + (orderExecutionPrice * orderQuantity)) / newQuantity

          holdings[optionKey].avgPrice = newAvgPrice
          holdings[optionKey].quantity = newQuantity

        } else {
          // Closing the existing potision starts here

          // It's okay to skip bad data cause Robinhood API is not perfect 
          // e.g. Can't close order when there's no options to close
          if(holdings[optionKey].quantity === 0) {
            holdings[optionKey].quantity = 0
            holdings[optionKey].avgPrice = 0
            holdings[optionKey].profitOrLoss = 0
            return
          }

          const newQuantity = holdings[optionKey].quantity - orderQuantity

          // Exercise and Assignment close orders
          // P/L is calculated based on the price difference between the uderlying price and strike price at the time of execution
          if(orderPositionSide === 'exercise+close' || orderPositionSide === 'assignment+close') {

            const optionToStockQuantity = orderQuantity * 100
            const premiumPaidorReceived = holdings[optionKey].avgPrice * holdings[optionKey].quantity

            if(orderPositionSide === 'exercise+close' && order.underlyingPrice) {
              const diffPrice = leg.optionType === 'call' ? order.underlyingPrice - leg.strikePrice : leg.strikePrice - order.underlyingPrice
              tradePL = diffPrice * optionToStockQuantity - premiumPaidorReceived
            }
  
            if(orderPositionSide === 'assignment+close' && order.underlyingPrice) {
              const diffPrice = leg.optionType === 'call' ? leg.strikePrice - order.underlyingPrice : order.underlyingPrice - leg.strikePrice
              tradePL = diffPrice * optionToStockQuantity + premiumPaidorReceived
            }
          } else {
            const diffPrice = orderExecutionPrice - holdings[optionKey].avgPrice
            tradePL = diffPrice * orderQuantity
          }

          // Sell to open call/put options, then expired in the money = take credit recevied as profit
          // Sell to open call/put options, then buy to close = take different between buying and selling prices
          if(
            (holdings[optionKey].orderPositionSide === 'sell+open' && orderPositionSide === 'expiration+close') ||
            (holdings[optionKey].orderPositionSide === 'sell+open' && orderPositionSide === 'buy+close')
          ) {
            tradePL = -tradePL
          }

          // TODO: Let's deal with multi legs strategies 
          // See line 158 at src/components/reports/helpers/options-calc/options-calc.test.ts
          // For current multi leg strategy implementation
          if(
            holdings[optionKey].isMulitiLegsOpeningOrder && holdings[optionKey].orderPositionSide === 'buy+open'
          ) {
            tradePL = -tradePL
          }

          // Closed all holding option positions, avgPrice is no longer needed
          if(newQuantity === 0) {
            holdings[optionKey].avgPrice = 0
          }

          holdings[optionKey].profitOrLoss += tradePL
          holdings[optionKey].quantity = newQuantity
          
        }

      } else {

        // This specific option is traded for the first time
        holdings[optionKey] = {
          quantity: orderQuantity,
          avgPrice: orderExecutionPrice,
          profitOrLoss: 0,
          isMulitiLegsOpeningOrder: order.legs.length > 1,
          orderPositionSide, // sell+open, buy+open, expiration+close, etc...
        }

      }

      // Save accumulated profit or loss
      profitOrLoss += holdings[optionKey].profitOrLoss

    })

    // When profit or loss occured mark them on the trade on profitOrLoss
    results = [{ ...order, profitOrLoss }, ...results]
  })

  return results
}