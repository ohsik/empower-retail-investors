/*
  Defining the types for the application

  Row data from different brokerage must converted to this format.
*/

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
  fees?: Fee[];
  timeSynced?: string;
}