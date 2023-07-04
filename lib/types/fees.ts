export interface Fee {
  id: string;
  type: 'subscriptionFee' | 'marginInterest';
  amount: number;
  executionDate: string;
}

export interface FeesWithKey {
  [key: string]: Fee[];
};