export interface Option {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  direction: 'debit' | 'credit';
  option_type: 'call' | 'put';
  position_effect: 'open' | 'close';
  side: 'buy' | 'sell';
  fees: number;
  strikePrice: number;
  premium: number;
  expirationDate: string;
  executionDate: string;
  profitOrLoss?: number;
}