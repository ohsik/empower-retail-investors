import { convertStringToNumber } from "../../helpers/string-to-number";
import { cryptoProfitLossCalculator } from "../../profit-loss-calculator/crypto";
import { optionsProfitLossCalculator } from "../../profit-loss-calculator/options";
import { stocksProfitLossCalculator } from "../../profit-loss-calculator/stocks";
import { Data, Stock, Option, Crypto, Dividend, Fee } from "../../types";

/*
  fetchedData is Robinhood's data
  Data is the data format we want to use in the application

  TODO: convert the data to the Data format
*/
export function dataTransform(fetchedData: any): Data {
  // console.log({fetchedData})
  // TODO: decide if we want to exclude cancelled, canceled, failed, voided, deleted orders
  // or keep it but exclude on Profit/Loss calculation
  const INCLUDE_DATA = ["filled", "partially_filled"];
  const EXCLUDED_DATA = ['cancelled', 'canceled', 'failed', 'voided', 'deleted', 'confirmed'];

  // Stocks data transformation
  const stocks: Stock[] = fetchedData.data.orders.results
  .filter((stock: any) => INCLUDE_DATA.includes(stock.state))
  .map((stock: any) => {
    const price = convertStringToNumber(stock.average_price ?? stock.price);
    const quantity = convertStringToNumber(stock.quantity);
    return { 
      id: stock.id,
      symbol: stock.symbol ?? stock.instrument,
      price: price,
      quantity: quantity,
      amount: price * quantity,
      fees: stock.fees,
      side: stock.side,
      executionDate: stock.updated_at,
    }
  });

  // Options data transformation
  const options: Option[] = fetchedData.data.options.results
  .filter((order: { state: string }) => INCLUDE_DATA.includes(order.state))
  .map((option: any) => {
    const executionDate = option.legs[0].executions[option.legs[0].executions.length - 1]?.timestamp ?? option.updated_at;

    // TODO: double check if this is the correct execution price
    function calculateAverages(executions: any[]) {
      const total = executions.reduce((acc, item) => {
        acc.totalPrice += parseFloat(item.price) * parseFloat(item.quantity);
        acc.totalQuantity += parseFloat(item.quantity);
        return acc;
      }, { totalPrice: 0, totalQuantity: 0 });

      const totalQuantity = total.totalQuantity;
      const totalAvgPrice = total.totalPrice / totalQuantity;
      return { totalQuantity, totalAvgPrice };
    }

    const legs = option.legs.map((leg: any) => {
      return {
        optionType: leg.option_type,
        positionEffect: leg.position_effect,
        side: leg.side,
        strikePrice: convertStringToNumber(leg.strike_price),
        expirationDate: leg.expiration_date,
        quantity: calculateAverages(leg.executions).totalQuantity,
        executionPrice: calculateAverages(leg.executions).totalAvgPrice
      };
    });

    const price = convertStringToNumber(option.price);
    const quantity = convertStringToNumber(option.quantity);

    return { 
      id: option.id,
      symbol: option.chain_symbol,
      price: price,
      quantity: quantity,
      amount: price * (quantity * 100),
      direction: option.direction,
      fees: convertStringToNumber(option.regulatory_fees),
      premium: convertStringToNumber(option.premium),
      executionDate: executionDate,
      legs: legs,
    };
  });


  // Crypto data transformation
  const crypto: Crypto[] = fetchedData.data.crypto.results
  .filter((stock: any) => INCLUDE_DATA.includes(stock.state))
  .map((crypto: any) => {
    const symbol = fetchedData.data.crypto_currency_pair.results.find((currency: any) => currency.id === crypto.currency_pair_id);
    const price = convertStringToNumber(crypto.average_price);
    const quantity = convertStringToNumber(crypto.quantity);

    return {
      id: crypto.id,
      symbol: symbol.symbol ?? crypto.currency_pair_id,
      price: price,
      quantity: quantity,
      amount: price * quantity,
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
    options: { 'all': optionsWithProfitOrLoss},
    crypto: { 'all': cryptoWithProfitOrLoss },
    dividends: { 'all': dividends },
    marginInterest: { 'all': marginInterest },
    subscriptionFees: { 'all': subscriptionFees },
    timeSynced: fetchedData.timeSynced
  }
}