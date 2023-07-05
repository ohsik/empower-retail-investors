export interface Option {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  direction: 'debit' | 'credit';
  fees: number;
  premium: number;
  executionDate: string;
  legs: Leg[];
  underlyingPrice?: number
  profitOrLoss?: number;
}

export interface Leg {
  optionType: 'call' | 'put';
  positionEffect: 'open' | 'close';
  strikePrice: number;
  side: 'buy' | 'sell';
  executionPrice: number;
  expirationDate: string;
  quantity: number;
}

export interface OptionsWithKey {
  [key: string]: Option[];
}