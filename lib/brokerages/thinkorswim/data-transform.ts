
import { optionsProfitLossCalculator } from "../../profit-loss-calculator/options";
import { stocksProfitLossCalculator } from "../../profit-loss-calculator/stocks";
import { Data, Leg, Option, Stock } from "../../types";

/*
  fetchedData is Thinkorswim's data
  Data is the data format we want to use in the application
*/

export function dataTransform(fetchedData: any): Data {
  // console.log({fetchedData})

  let stocks: Stock[] = [];
  let options: Option[] = [];

  function getOrderDirection(instruction: string): Option["direction"] {
    const debitOrders = ["BUY", "BUY_TO_COVER", "BUY_TO_CLOSE"];
    return debitOrders.includes(instruction) ? 'debit' : 'credit';
  }

  type GetSideAndPositionEffectReturn = {
    side: Leg["side"];
    positionEffect: Leg["positionEffect"];
  } | undefined;

  function getSideAndPositionEffect(instruction: string): GetSideAndPositionEffectReturn {
    // TODO: find out if BUY and SELL orders are needed here
    // filtering them out for now by returning undefined

    // BUY, SELL, BUY_TO_COVER, SELL_SHORT, BUY_TO_OPEN, BUY_TO_CLOSE, SELL_TO_OPEN, SELL_TO_CLOSE, EXCHANGE

    const conversionMap: Record<string, GetSideAndPositionEffectReturn> = {
      'BUY_TO_COVER': {
        side: 'buy',
        positionEffect: 'close'
      },
      'SELL_SHORT': {
        side: 'sell',
        positionEffect: 'open'
      },
      'BUY_TO_OPEN': {
        side: 'buy',
        positionEffect: 'open'
      },
      'BUY_TO_CLOSE': {
        side: 'buy',
        positionEffect: 'close'
      },
      'SELL_TO_OPEN': {
        side: 'sell',
        positionEffect: 'open'
      },
      'SELL_TO_CLOSE': {
        side: 'sell',
        positionEffect: 'close'
      },
    };
  
    return conversionMap[instruction]; // BUY, SELL, EXCHANGE will be undefined and everything else that are not defined here
  }

  fetchedData.data.orders.forEach((order: any) => {
    if(order.orderLegCollection[0].orderLegType === 'EQUITY') {

      stocks.push({
        id: order.orderId,
        symbol: order.orderLegCollection[0].instrument.symbol,
        price: order.price,
        quantity: order.quantity,
        fees: 0,
        side: order.orderLegCollection[0].instruction,
        executionDate: order.closeTime,
      })

    } else if(order.orderLegCollection[0].orderLegType === 'OPTION') {

      const legs = order.orderLegCollection.map((leg: any) => {
        const sideAndPositionEffect = getSideAndPositionEffect(leg.instruction);
        
        // data format we deal with: "symbol": "TLRY_011725C1.5",
        const optionData = leg.instruction.symbol;
        
        // Extracting expiration date
        const expirationDateMatch = optionData.match(/_(\d{6})/);
        const expirationDate = expirationDateMatch && expirationDateMatch[1];
        
        // Extracting strike price
        const strikePriceMatch = optionData.match(/(\d+(?:\.\d+)?)/);
        const strikePrice = strikePriceMatch && parseFloat(strikePriceMatch[1]);

        return {
          optionType: leg.instrument.putCall.toLowerCase() === 'call' ? 'call' : 'put',
          positionEffect: sideAndPositionEffect?.positionEffect,
          side: sideAndPositionEffect?.side,
          strikePrice: strikePrice,
          expirationDate: expirationDate,
          quantity: order.quantity,
          executionPrice: order.price
        };
      });

      // Only add valid option trades
      if(order.orderLegCollection[0].instrument.underlyingSymbol && legs.optionType && legs.side && legs.positionEffect && legs.strikePrice && legs.expirationDate) {
        options.push({
          id: order.orderId,
          symbol: order.orderLegCollection[0].instrument.underlyingSymbol,
          price: order.price,
          quantity: order.quantity,
          direction: getOrderDirection(order.orderLegCollection[0].instruction),
          fees: 0,
          premium: order.price,
          executionDate: order.closeTime,
          legs: legs,
          underlyingPrice: undefined,
        })
      }

    }
  });

  const stocksWithProfitOrLoss = stocksProfitLossCalculator(stocks);
  const optionsWithProfitOrLoss = optionsProfitLossCalculator(options);

  return {
    stocks: { 'all': stocksWithProfitOrLoss },
    options: { 'all': optionsWithProfitOrLoss },
    timeSynced: fetchedData.timeSynced
  }
}