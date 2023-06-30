export interface Dividend {
  id: string;
  symbol: string;
  amount: number;
  position: number; // how many shares
  excutionDate: string;
}