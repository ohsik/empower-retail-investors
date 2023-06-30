/*
  This Chrome extension needs authorization token to make http requests to brokerage platforms.
  "GET_AUTH_TOKEN_URLS" is needed to listen and grab authorization token from the request headers which will be used to make http requests to brokerage platforms.
  This means users must logged in to the brokerage platforms in order to use this Chrome extension.
*/
export const GET_AUTH_TOKEN_URLS = [
  'https://api.robinhood.com/user/',
  'https://api.robinhood.com/accounts/'
];

interface Endpoints {
  [key: string]: string;
}

const API_URL = 'https://api.robinhood.com';
const NUMMUS_URL = 'https://nummus.robinhood.com'; // Robinhood Crypto API

export const ENDPOINTS: Endpoints = {
  user: `${API_URL}/user/`, // user account info
  crypto_currency_pair: `${NUMMUS_URL}/currency_pairs/`, // crypto currency pairs dictionary

  // Trading history endpoints
  orders: `${API_URL}/orders/`, // stock orders history
  options: `${API_URL}/options/orders/`, // options orders history
  crypto: `${NUMMUS_URL}/orders/`, // crypto orders history
  dividends: `${API_URL}/dividends/`, // dividends history
  subscription_fees: `${API_URL}/subscription/subscription_fees/`, // subscription fees history
  margin_interest_charges: `${API_URL}/cash_journal/margin_interest_charges/`, // margin interest charges history
  options_events: `${API_URL}/options/events/`, // options events history (exercise, assignment, expire...)
  corp_actions: `${API_URL}/corp_actions/v2/split_payments/`, // corporate actions history (stock splits)

  // Get current holding assets endpoints
  all_stock_positions: `${API_URL}/positions/`, // all stock positions i.g. https://api.robinhood.com/positions/?account_number=ACOUNT_NUMBER&nonzero=true
  all_options_positions: `${API_URL}/options/aggregate_positions/`, // all options positions i.g. https://api.robinhood.com/options/aggregate_positions/?nonzero=True
  all_crypto_positions: `${NUMMUS_URL}/holdings/`, // all crypto positions
};
