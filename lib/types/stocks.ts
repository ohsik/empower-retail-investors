export interface Stock {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  fees: number;
  side: 'buy' | 'sell';
  executionDate: string;
  profitOrLoss?: number;
}