import { convertStringToNumber } from "../../helpers/string-to-number";
import { cryptoProfitLossCalculator } from "../../profit-loss-calculator/crypto";
import { optionsProfitLossCalculator } from "../../profit-loss-calculator/options";
import { stocksProfitLossCalculator } from "../../profit-loss-calculator/stocks";
import { Data, Stock, Option, Crypto, Dividend, Fee } from "../../types";

/*
  fetchedData is Robnhood's data
  Data is the data format we want to use in the application

  TODO: convert the data to the Data format
*/
export function dataTransform(fetchedData: any): Data {
  // console.log({fetchedData})
  // TODO: decide if we want to exclude cancelled, canceled, failed, voided, deleted orders
  // or keep it but exclude on Profit/Loss calculation
  const INCLUDE_DATA = ["filled"];
  const EXCLUDED_DATA = ['cancelled', 'canceled', 'failed', 'voided', 'deleted'];

  // Stocks data transformation
  const stocks: Stock[] = fetchedData.data.orders.results
  .filter((stock: any) => INCLUDE_DATA.includes(stock.state))
  .map((stock: any) => {
    return { 
      id: stock.id,
      symbol: stock.symbol ?? stock.instrument,
      price: convertStringToNumber(stock.average_price ?? stock.price),
      quantity: convertStringToNumber(stock.quantity),
      fees: stock.fees,
      side: stock.side,
      executionDate: stock.updated_at,
    }
  });

  // Options data transformation
  const options: Option[] = fetchedData.data.options.results
  .filter((order: { state: string }) => !EXCLUDED_DATA.includes(order.state))
  .map((option: any) => {
    const executionDate = option.legs[0].executions[option.legs[0].executions.length - 1]?.timestamp ?? option.updated_at;
    const legs = option.legs.map((leg: any) => {
      return {
        optionType: leg.option_type,
        positionEffect: leg.position_effect,
        side: leg.side,
        strikePrice: convertStringToNumber(leg.strike_price),
        expirationDate: leg.expiration_date,
        quantity: convertStringToNumber(option.quantity), // TODO: get actual quantity from each leg executions
        executionPrice: convertStringToNumber(option.price) // TODO: probably need a function to get avg execution price from [let.executions[0].price and let.executions[0].quantity]
      };
    });

    return { 
      id: option.id,
      symbol: option.chain_symbol,
      price: convertStringToNumber(option.price),
      quantity: convertStringToNumber(option.quantity),
      direction: option.direction,
      fees: 0,
      premium: convertStringToNumber(option.premium),
      executionDate: executionDate,
      legs: legs,
      underlyingPrice: option.underlying_price ? convertStringToNumber(option.underlying_price) : undefined,
    };
  });


  // Crypto data transformation
  const crypto: Crypto[] = fetchedData.data.crypto.results
  .filter((stock: any) => INCLUDE_DATA.includes(stock.state))
  .map((crypto: any) => {
    const symbol = fetchedData.data.crypto_currency_pair.results.find((currency: any) => currency.id === crypto.currency_pair_id);

    return {
      id: crypto.id,
      symbol: symbol.symbol ?? crypto.currency_pair_id,
      price: convertStringToNumber(crypto.average_price),
      quantity: convertStringToNumber(crypto.quantity),
      fees: 0,
      side: crypto.side,
      executionDate: crypto.last_transaction_at
    };
  });

  // Dividends data transformation
  const dividends: Dividend[] = fetchedData.data.dividends.results
  .filter((order: { state: string }) => !EXCLUDED_DATA.includes(order.state))
  .map((dividend: any) => {
    return {
      id: dividend.id,
      symbol: dividend.symbol ?? dividend.instrument,
      amount: convertStringToNumber(dividend.amount),
      position: dividend.position,
      executionDate: dividend.payable_date, 
    };
  });

  // Margin interest data transformation
  const marginInterest: Fee[] = fetchedData.data.margin_interest_charges.results.map((fee: any) => {
    return {
      id: fee.id,
      type: 'marginInterest',
      amount: -convertStringToNumber(fee.amount),
      executionDate: fee.created_at,
    }
  });

  // Subscription fees data transformation
  const subscriptionFees: Fee[] = fetchedData.data.subscription_fees.results.map((fee: any) => {
    return {
      id: fee.id,
      type: 'subscriptionFee',
      amount: -convertStringToNumber(fee.amount),
      executionDate: fee.created_at,
    }
  });
  

  /*
    Adding ProfitOrLoss on Stocks, Options, and Crypto
  */
  const stocksWithProfitOrLoss = stocksProfitLossCalculator(stocks);
  const optionsWithProfitOrLoss = optionsProfitLossCalculator(options);
  const cryptoWithProfitOrLoss = cryptoProfitLossCalculator(crypto);

  return {
    stocks: { 'all': stocksWithProfitOrLoss },
    options: { 'all':  optionsWithProfitOrLoss},
    crypto: { 'all':  cryptoWithProfitOrLoss},
    dividends: { 'all':  dividends},
    marginInterest: { 'all':  marginInterest},
    subscriptionFees: { 'all':  subscriptionFees},
    timeSynced: fetchedData.timeSynced
  }
}