export const getAuthTokenurls = ["https://api.robinhood.com/user/", "https://api.robinhood.com/accounts/"];

// export function requestHeaders(token: any): Headers {
//   const myHeaders = new Headers();

//   myHeaders.append('Content-Type', 'application/json');
//   myHeaders.append('Authorization', token);

//   return myHeaders
// }

interface Endpoint {
  [key: string]: string;
}

const API_URL = 'https://api.robinhood.com';
const NUMMUS_URL = 'https://nummus.robinhood.com'; // RH Crypto API

export const endpoints: Endpoint = {
  user: `${API_URL}/user/`,
  orders: `${API_URL}/orders/`,
  options: `${API_URL}/options/orders/`,
  crypto: `${NUMMUS_URL}/orders/`,
  dividends: `${API_URL}/dividends/`,
  subscription_fees: `${API_URL}/subscription/subscription_fees/`,
  margin_interest_charges: `${API_URL}/cash_journal/margin_interest_charges/`,
  options_events: `${API_URL}/options/events/`,
  corp_actions: `${API_URL}/corp_actions/v2/split_payments/`,
}

export const END_POINTS_ARRAY = Object.keys(endpoints);

export const CRYPTO_CURRENCY_PAIR = 'https://nummus.robinhood.com/currency_pairs/'

// Get current holding assets
// export const ALL_STOCKS_POSITIONS = 'https://api.robinhood.com/positions/' // https://api.robinhood.com/positions/?account_number=ACOUNT_NUMBER&nonzero=true
// export const ALL_OPTIONS_POSITIONS = 'https://api.robinhood.com/options/aggregate_positions/' // https://api.robinhood.com/options/aggregate_positions/?nonzero=True
// export const ALL_CRYPTO_POSITIONS = 'https://nummus.robinhood.com/holdings/'
