export interface Fee {
  id: string;
  type: 'subscriptionFee' | 'marginInterest';
  amount: number;
  excutionDate: string;
}