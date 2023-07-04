/*
  Defining the types for the application

  Row data from different brokerage must converted to this format.
*/
export * from './crypto';
export * from './stocks';
export * from './options';
export * from './dividends';
export * from './fees';

import { Crypto, CryptoWithKey } from './crypto';
import { Stock, StocksWithKey } from './stocks';
import { Option, OptionsWithKey } from './options';
import { Dividend, DividendsWithKey } from './dividends';
import { Fee, FeesWithKey } from './fees';

export interface Data {
  stocks?: StocksWithKey;
  options?: OptionsWithKey;
  crypto?: CryptoWithKey;
  dividends?: DividendsWithKey;
  marginInterest?: FeesWithKey;
  subscriptionFees?: FeesWithKey;
  timeSynced?: string;
}

export interface AllData {
  [key: string]: Data;
};

export interface DataWithKeys {
  data?: StocksWithKey | OptionsWithKey | CryptoWithKey | DividendsWithKey | FeesWithKey | undefined;
}

export interface DataArrays {
  data?: (Stock | Option | Crypto | Dividend | Fee)[] | undefined;
}