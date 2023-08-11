import { Brokerages } from '../consts/brokerages';
import { Data } from '../types';

import { 
  GET_AUTH_TOKEN_URLS as robinhood_getAuthTokenUrls,
  ENDPOINTS as robinhood_endpoints,
  getUserData as robinhood_getUserData ,
  dataTransform as robinhood_dataTransform,
} from './robinhood';

import { 
  GET_ACCOUNT_NUMBER as thinkorswim_getAuthTokenUrls,
  GET_ACCESS_TOKEN as thinkorswim_getAccessToken,
  ENDPOINTS as thinkorswim_endpoints,
  getUserData as thinkorswim_getUserData ,
  dataTransform as thinkorswim_dataTransform,
} from './thinkorswim';

// TODO: re-visit this cause it's getting too messy
type BROKERAGES_VARS_TYPE = {
  [key: string]: {
    [key: string]: any;
    endpoints: { [key: string]: string } | ((arg: string) => { [key: string]: string });
    getUserData: (currentBrokerage: Brokerages | undefined, authToken?: string) => Promise<any>;
    transformData: (fetchedData: any) => Data;
  }
};

export const BROKERAGES_VARS: BROKERAGES_VARS_TYPE = {
  [Brokerages.Robinhood]: {
    getAuthTokenUrls: robinhood_getAuthTokenUrls,
    endpoints: robinhood_endpoints,
    getUserData: robinhood_getUserData,
    transformData: robinhood_dataTransform,
  },
  [Brokerages.Thinkorswim]: {
    getAccountNumber: thinkorswim_getAuthTokenUrls,
    getAccessToken: thinkorswim_getAccessToken,
    endpoints: thinkorswim_endpoints,
    getUserData: thinkorswim_getUserData,
    transformData: thinkorswim_dataTransform,
  },
}