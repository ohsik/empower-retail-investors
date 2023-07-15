export enum Brokerages {
  All = 'all',
  Robinhood = 'robinhood',
  Thinkorswim = 'thinkorswim',
  Etrade = 'etrade',
  InteractiveBrokers = 'interactiveBrokers',
  Webull = 'webull',
  CharlesSchwab = 'charlesSchwab',
  Fidelity = 'fidelity',
}

type BrokerageNames = Record<Brokerages, string>;

export const brokerageNames: BrokerageNames = {
  [Brokerages.All]: 'All Brokerages',
  [Brokerages.Robinhood]: 'Robinhood',
  [Brokerages.Thinkorswim]: 'Thinkorswim',
  [Brokerages.Etrade]: 'E-Trade',
  [Brokerages.InteractiveBrokers]: 'Interactive Brokers',
  [Brokerages.Webull]: 'Webull',
  [Brokerages.CharlesSchwab]: 'Charles Schwab',
  [Brokerages.Fidelity]: 'Fidelity',
};

export const brokerageUrls = {
  [Brokerages.Robinhood]: 'robinhood.com',
  [Brokerages.Thinkorswim]: 'thinkorswim.com',
  [Brokerages.Etrade]: 'etrade.com',
  [Brokerages.InteractiveBrokers]: 'interactivebrokers.com',
  [Brokerages.Webull]: 'webull.com',
  [Brokerages.CharlesSchwab]: 'charlesschwab.com',
  [Brokerages.Fidelity]: 'fidelity.com',
} as const;

export const supportedBrokerages: Array<Brokerages> = [
  Brokerages.Robinhood,
  Brokerages.Thinkorswim,
  // Brokerages.Webull
];