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
  profitOrLoss?: number;
}

interface Leg {
  optionType: 'call' | 'put';
  positionEffect: 'open' | 'close';
  strikePrice: number;
  side: 'buy' | 'sell';
  executionPrice: number;
  expirationDate: string;
}

export interface OptionsWithKey {
  [key: string]: Option[];
}