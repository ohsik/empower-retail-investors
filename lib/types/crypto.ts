export interface Crypto {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  fees: number;
  side: string;
  excutionDate: string;
  profitOrLoss?: number;
}