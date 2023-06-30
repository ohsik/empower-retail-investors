import { Brokerages } from '../consts/brokerages';
import { GET_AUTH_TOKEN_URLS as robinhood_getAuthTokenUrls, ENDPOINTS as robinhood_endpoints, getUserData as robinhood_getUserData } from './robinhood';
// import { GET_AUTH_TOKEN_URLS as webull_getAuthTokenUrls } from './webull';

type BrokeragesUrls = {
  [key: string]: {
    getAuthTokenUrls: string[];
    endpoints: {
      [key: string]: string;
    }
    getUserData: (currentBrokage: string | undefined, authToken?: string) => Promise<any>; // TODO: update any
  }
};

export const BROKERAGES_URLS: BrokeragesUrls = {
  [Brokerages.Robinhood]: {
    getAuthTokenUrls: robinhood_getAuthTokenUrls,
    endpoints: robinhood_endpoints,
    getUserData: robinhood_getUserData,
  },
  // TODO: Add Webull support
  // [Brokerages.Webull]: {
  //   getAuthTokenUrls: webull_getAuthTokenUrls,
  //   endpoints: robinhood_endpoints,
  //   getUserData: robinhood_getUserData,
  // }
}