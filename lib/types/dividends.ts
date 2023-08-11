export interface Dividend {
  id: string;
  symbol: string;
  amount: number;
  position?: number; // how many shares
  executionDate: string;
}

export interface DividendsWithKey {
  [key: string]: Dividend[];
};
