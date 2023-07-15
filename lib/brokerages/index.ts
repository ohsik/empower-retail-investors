import { Brokerages } from '../consts/brokerages';
import { Data } from '../types';

import { 
  GET_AUTH_TOKEN_URLS as robinhood_getAuthTokenUrls,
  ENDPOINTS as robinhood_endpoints,
  getUserData as robinhood_getUserData ,
  dataTransform as robinhood_dataTransform,
} from './robinhood';

// import { GET_AUTH_TOKEN_URLS as webull_getAuthTokenUrls } from './webull';

type BrokeragesUrls = {
  [key: string]: {
    getAuthTokenUrls: string[];
    endpoints: {
      [key: string]: string;
    }
    getUserData: (currentBrokerage: Brokerages | undefined, authToken?: string) => Promise<any>; // TODO: update any
    transformData: (fetchedData: any) => Data;
  }
};

export const BROKERAGES_VARS: BrokeragesUrls = {
  [Brokerages.Robinhood]: {
    getAuthTokenUrls: robinhood_getAuthTokenUrls,
    endpoints: robinhood_endpoints,
    getUserData: robinhood_getUserData,
    transformData: robinhood_dataTransform,
  },
  // TODO: Add Webull support
  // [Brokerages.Webull]: {
  //   getAuthTokenUrls: webull_getAuthTokenUrls,
  //   endpoints: robinhood_endpoints,
  //   getUserData: robinhood_getUserData,
  // }
}