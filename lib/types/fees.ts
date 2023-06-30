export interface Fee {
  id: string;
  type: string; // subscription | margin_interest | other...
  amount: number;
  excutionDate: string;
}