import { Data, Stock, Option, Crypto, Dividend, Fee } from "../../types";

/*
  fetchedData is Robnhood's data
  Data is the data format we want to use in the application

  TODO: convert the data to the Data format
*/
export function dataTransform(fetchedData: any): Data {

  // TODO: decide if we want to exclude cancelled, canceled, failed, voided, deleted orders
  // or keep it but exclude on Profit/Loss calculation
  // const EXCLUDED_DATA = ['cancelled', 'canceled', 'failed', 'voided', 'deleted'];

  // Stocks data transformation
  const stocks: Stock[] = fetchedData.data.orders.results.map((stock: any) => {
    return { 
      id: stock.id,
      symbol: stock.symbol ?? stock.instrument,
      price: stock.average_price ?? stock.price,
      quantity: stock.quantity,
      fees: stock.fees,
      side: stock.side,
      executionDate: stock.updated_at
    }
  });

  // Options data transformation
  const options: Option[] = fetchedData.data.options.results
    .map((option: any) => {
      const executionDate = option.legs[0].executions[option.legs[0].executions.length - 1]?.timestamp ?? option.updated_at;
      const legs = option.legs.map((leg: any) => {
        return {
          optionType: leg.option_type,
          positionEffect: leg.position_effect,
          side: leg.side,
          strikePrice: leg.strike_price,
          expirationDate: leg.expiration_date,
        };
      });

      return { 
        id: option.id,
        symbol: option.chain_symbol,
        price: option.price,
        quantity: option.quantity,
        direction: option.direction,
        fees: 0,
        premium: option.premium,
        executionDate: executionDate,
        legs: legs,
      };
  });


  // Crypto data transformation
  const crypto: Crypto[] = fetchedData.data.crypto.results.map((crypto: any) => {
    const symbol = fetchedData.data.crypto_currency_pair.results.find((currency: any) => currency.id === crypto.currency_pair_id);

    return {
      id: crypto.id,
      symbol: symbol.symbol ?? crypto.currency_pair_id,
      price: crypto.average_price,
      quantity: crypto.quantity,
      fees: 0,
      side: crypto.side,
      executionDate: crypto.updated_at
    };
  });

  // Dividends data transformation
  const dividends: Dividend[] = fetchedData.data.dividends.results.map((dividend: any) => {
    return {
      id: dividend.id,
      symbol: dividend.symbol ?? dividend.instrument,
      amount: dividend.amount,
      position: dividend.position,
      executionDate: dividend.payable_date, 
    };
  });

  // Margin interest data transformation
  const marginInterest: Fee[] = fetchedData.data.margin_interest_charges.results.map((fee: any) => {
    return {
      id: fee.id,
      type: 'marginInterest',
      amount: fee.amount,
      executionDate: fee.created_at,
    }
  });

  // Subscription fees data transformation
  const subscriptionFees: Fee[] = fetchedData.data.subscription_fees.results.map((fee: any) => {
    return {
      id: fee.id,
      type: 'subscriptionFee',
      amount: fee.amount,
      executionDate: fee.created_at,
    }
  });
  
  return {
    stocks: { 'all': stocks },
    options: { 'all':  options},
    crypto: { 'all':  crypto},
    dividends: { 'all':  dividends},
    marginInterest: { 'all':  marginInterest},
    subscriptionFees: { 'all':  subscriptionFees},
    timeSynced: fetchedData.timeSynced
  }
}