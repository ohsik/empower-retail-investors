export interface Option {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  direction: string; // debit | credit
  option_type: string; // call | put
  position_effect: string;  // open | close
  side: string; // buy | sell
  fees: number;
  excutionDate: string;
  profitOrLoss?: number;
}