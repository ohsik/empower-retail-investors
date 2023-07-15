import { BROKERAGES_VARS } from "..";
import { Brokerages } from "../../consts/brokerages";
import { localFetchedDataName } from "../../consts/local-storage-var";
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

async function fetchData(authToken: string, endpoint: string): Promise<void> {
  try {
    const reponse = await fetch(endpoint, {
      method: 'GET',
      headers: requestHeaders(authToken)
    })

    // TODO: consider error handling here for the fetch
    // if(!reponse.ok) { 
    //   do something...
    //   reponse.status === '401' && 'UnAuthrized reqeust, plz login'
    // }

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