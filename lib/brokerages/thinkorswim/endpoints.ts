interface Endpoints {
  [key: string]: string;
}

const currentDate = new Date();
const formattedDate = currentDate.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');

const API_URL = 'https://api.tdameritrade.com/v1';

export const GET_ACCOUNT_NUMBER = `${API_URL}/accounts`;
export const GET_ACCESS_TOKEN = `${API_URL}/oauth2/token`;
/*
  TD Ameritrade API:
  https://developer.tdameritrade.com/apis
*/
export function ENDPOINTS(accountNumber: string): Endpoints {
  return {
    orders: `${API_URL}/orders?fromEnteredTime=1971-01-01&toEnteredTime=${formattedDate}&status=FILLED`, // Get only filled orders: https://developer.tdameritrade.com/account-access/apis/get/orders-0
    transactions: `${API_URL}/accounts/${accountNumber}/transactions`,
  };
}
