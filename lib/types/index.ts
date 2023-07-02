/*
  Defining the types for the application

  Row data from different brokerage must converted to this format.
*/
export * from './crypto';
export * from './stocks';
export * from './options';
export * from './dividends';
export * from './fees';

import { Crypto } from './crypto';
import { Stock } from './stocks';
import { Option } from './options';
import { Dividend } from './dividends';
import { Fee } from './fees';

export interface Data {
  stocks?: Stock[];
  options?: Option[];
  crypto?: Crypto[];
  dividends?: Dividend[];
  marginInterest?: Fee[];
  subscriptonFees?: Fee[];
  timeSynced?: string;
}

export interface AllData {
  [key: string]: Data;
};
