
import { optionsProfitLossCalculator } from "../../profit-loss-calculator/options";
import { stocksProfitLossCalculator } from "../../profit-loss-calculator/stocks";
import { Data, Dividend, Leg, Option, Stock } from "../../types";

/*
  fetchedData is Thinkorswim's data
  Data is the data format we want to use in the application
*/

function getOrderDirection(instruction: string): Option["direction"] {
  const debitOrders = ["BUY", "BUY_TO_COVER", "BUY_TO_CLOSE", "BUY_TO_OPEN"];
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

function getTransactionFee(fees: { fees: Record<string, number>}): number{
  return fees ? Object.values(fees).reduce((acc: number, fee: any) => acc + fee, 0) : 0;
}

export function dataTransform(fetchedData: any): Data {
  // console.log({fetchedData})

  let stocks: Stock[] = [];
  let options: Option[] = [];
  let dividends: Dividend[] = [];

  let transactionFeeDictionary: Record<string, number> = {}
  // console.log(fetchedData)

  fetchedData.data?.transactions?.forEach((transaction: any) => {
    // Get transaction fees
    if(transaction.type === 'TRADE') {
      const transactionFee = getTransactionFee(transaction.fees)
      const orderId = transaction.orderId;
      transactionFeeDictionary[orderId] = transactionFee;
    
    // Get dividends
    } else if (transaction.type === 'DIVIDEND_OR_INTEREST') {
      
      // TODO: get the fee for the dividend transaction
      const transactionFee = getTransactionFee(transaction.fees);
      dividends.push({
        id: transaction.transactionId,
        symbol: transaction.transactionItem.instrument.symbol + ' ' + transaction.description,
        amount: transaction.netAmount - transactionFee,
        executionDate: transaction.transactionDate,
      })
      
    }
  });

  fetchedData.data.orders.forEach((order: any) => {
    if(order.orderLegCollection[0].orderLegType === 'EQUITY') {
      const orderPrice = order.price ?? order.orderActivityCollection[0].executionLegs[0].price; // TODO: re-visit this order.orderActivityCollection[0].executionLegs[0].price

      stocks.push({
        id: order.orderId,
        symbol: order.orderLegCollection[0].instrument.symbol,
        price: orderPrice,
        quantity: order.quantity,
        amount: orderPrice * order.quantity,
        fees: transactionFeeDictionary[order.orderId],
        side: order.orderLegCollection[0].instruction.toLowerCase(),
        executionDate: order.closeTime,
      })

    } else if (order.orderLegCollection[0].orderLegType === 'OPTION') {

      const legs = order.orderLegCollection.map((leg: any) => {
        const sideAndPositionEffect = getSideAndPositionEffect(leg.instruction);
        
        // data format we deal with: "symbol": "TLRY_011725C1.5",
        const optionData = leg.instrument.symbol;

        // Extracting expiration date
        const expirationDateMatch = optionData.match(/_(\d{6})/);
        const expirationDateRaw = expirationDateMatch && expirationDateMatch[1];
        const expirationDate = /^\d{6}$/.test(expirationDateRaw) ? `${expirationDateRaw.slice(0, 2)}/${expirationDateRaw.slice(2, 4)}/${expirationDateRaw.slice(4)}` : expirationDateRaw;
        
        // Extracting strike price
        function extractStrikePrice(optionString: string): string | null {
          const regex = /_[0-9]{6}(?:C|P)?(\d|\.\d)?/;
          const match = optionString.match(regex);
          return match ? match[1] : null;
        }
        
        const strikePrice = extractStrikePrice(optionData);

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
      if(order.orderLegCollection[0].instrument.underlyingSymbol && legs[0].optionType && legs[0].side && legs[0].positionEffect && legs[0].strikePrice && legs[0].expirationDate) {
        const orderPrice = order.price ?? order.orderActivityCollection[0].executionLegs[0].price; // TODO: re-visit this order.orderActivityCollection[0].executionLegs[0].price

        options.push({
          id: order.orderId,
          symbol: order.orderLegCollection[0].instrument.underlyingSymbol,
          price: orderPrice,
          quantity: order.quantity,
          amount: orderPrice * (order.quantity * 100),
          direction: getOrderDirection(order.orderLegCollection[0].instruction),
          fees: transactionFeeDictionary[order.orderId],
          premium: orderPrice * 100,
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
    dividends: { 'all': dividends },
    timeSynced: fetchedData.timeSynced
  }
}