import { BROKERAGES_VARS } from "..";
import { Brokerages } from "../../consts/brokerages";
import { localFetchedDataName, localRefreshTokenName } from "../../consts/local-storage-var";
import { requestHeaders } from "../../helpers/request-headers";


/*
  How to get data from the Thinkorswim API.

  1. Get account number from ENDPOINTS.accountNumber endpoint.
  2. Use the account number to get orders from ENDPOINTS.orders endpoint.
*/


// Thinkofswim probably has different types of account other than "securitiesAccount"
function findAccountNumber(obj: any): string | undefined {
  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === "accountId") return obj[key];
        const result = findAccountNumber(obj[key]);
        if (result) return result;
      }
    }
  }
  return undefined;
}

// Get new access token cause auth token expires in 30 mins
// https://developer.tdameritrade.com/authentication/apis/post/token-0
async function getNewAccessToken(): Promise<string | undefined> {
  const url = BROKERAGES_VARS[Brokerages.Thinkorswim].getAccessToken;

  const refreshToken = await new Promise<string>((resolve) => {
    chrome.storage.local.get(localRefreshTokenName(Brokerages.Thinkorswim), ({ [localRefreshTokenName(Brokerages.Thinkorswim)]: refreshToken }) => {
      resolve(refreshToken);
    });
  });

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  params.append('client_id', 'TDATRADERX@AMER.OAUTHAP');

  const options = {
    method: 'POST',
    body: params,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return `${data.token_type} ${data.access_token}`
  } catch (error) {
    console.error('Error fetching getNewAccessToken:', error);
  }
}

async function fetchData(authToken: string, endpoint: string): Promise<void> {
  try {
    const reponse = await fetch(endpoint, {
      method: 'GET',
      headers: requestHeaders(authToken)
    })

    if(!reponse.ok) {
      // when authToken does not work, we want to get a new accessToken with the refreshToken
      // authToken expires in 30 mins
      // refreshToken expires in 90 days
      // Make users re-login after 90 days
      if(reponse.status === 401) {
        const newAccessToken = await getNewAccessToken();
        newAccessToken ? fetchData(newAccessToken, endpoint) : console.log('Error: getNewAccessToken fetched but returned undefied');
      } else {
        console.log('Error fetchData: ', reponse)
      }
    }

    const data = await reponse.json()
    return data

  } catch (error) {
    console.log(error)
  }
}

export async function getUserData(currentBrokerage: Brokerages | undefined, authToken: string = '') {
  if(!currentBrokerage) {
    throw Error('No current brokerage')
  }

  if(!authToken) {
    throw Error('Thinkorswim authToken is missing.')
  }

  const accountNumberObj = await fetchData(authToken, BROKERAGES_VARS[currentBrokerage].getAccountNumber)
  const accountNumber = findAccountNumber(accountNumberObj);

  if (accountNumber) {
    // TODO: cause I have function | object for the enpoint type. Maybe there's a better solution.
    const getEndpoints = BROKERAGES_VARS[currentBrokerage].endpoints;
    const endpoints = typeof getEndpoints === "function" ? getEndpoints(accountNumber) : getEndpoints;

    const fetchedData = await Promise.all(
      Object.entries(endpoints).map(async ([key, endpointUrl]) => {
        const data = await fetchData(authToken, endpointUrl)
        return { [key]: data };
      })
    );
  
    const timeSynced = new Date();
  
    const allData = {
      [localFetchedDataName(currentBrokerage)]: {
        data: Object.assign({}, ...fetchedData),
        timeSynced: timeSynced.toISOString()
      }    
    }
  
    if(allData) {
      chrome.storage.local.set(allData)
      return allData
    } else {
      return {
        error: `${currentBrokerage} data-access failed to save data.`
      }
    }
  }

  console.log(`${currentBrokerage} data-access getUserData failed.`)
  return accountNumberObj // should return error
}