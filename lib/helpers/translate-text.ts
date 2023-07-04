export function translateMenuText(input: string): string {
  if(input === 'subscriptionFees') return 'Subscription fees'
  if(input === 'marginInterest') return 'Margin interest charges'
  return input
}