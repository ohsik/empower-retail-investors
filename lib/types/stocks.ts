export interface Stock {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  amount: number; // price * quantity
  fees: number;
  side: 'buy' | 'sell';
  executionDate: string;
  profitOrLoss?: number;
}

export interface StocksWithKey {
  [key: string]: Stock[]
}