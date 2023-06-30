export interface Fee {
  id: string;
  type: 'subscription' | 'marginInterest';
  amount: number;
  excutionDate: string;
}