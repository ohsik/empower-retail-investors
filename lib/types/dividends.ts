export interface Dividend {
  id: string;
  symbol: string;
  amount: number;
  executionDate: string;
}

export interface DividendsWithKey {
  [key: string]: Dividend[];
};
