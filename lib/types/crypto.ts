export interface Crypto {
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

export interface CryptoWithKey {
  [key: string]: Crypto[];
};