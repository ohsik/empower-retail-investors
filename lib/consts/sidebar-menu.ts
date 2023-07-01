interface SidebarMenu {
  key: string;
  name: string;
  url: string;
}

export const sidebarMenu: SidebarMenu[] = [
  { key: 'portfolio', name: '💼 Portfolio', url: `/` },
  { key: 'stocks', name: '📈 Stocks', url: `/stocks` },
  { key: 'options', name: '⏳ Options', url: `/options` },
  { key: 'crypto', name: '🌎 Crypto', url: `/crypto` },
  { key: 'dividends', name: '💵 Dividends', url: `/dividends` },
  { key: 'subscriptionFees', name: '💸 Subscription fees', url: `/subscription-fees` },
  { key: 'marginInterest', name: '💳 Margin interest', url: `/margin-interest` },
  { key: 'about', name: '😻 About', url: `/about` }
];