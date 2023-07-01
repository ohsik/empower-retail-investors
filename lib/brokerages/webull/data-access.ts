import { BROKERAGES_VARS } from "..";
import { requestHeaders } from "../../helpers/request-headers";

// TODO: Promise<void> should have typed return data
async function fetchData(authToken: string, endpoint: string, allOrders: any[] = []): Promise<void> {
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

    // Get all data from Robinhood pagination with recursion
    if(data.next) {
      allOrders = [
        ...allOrders,
        ...data.results
      ]

      return await fetchData(authToken, data.next, allOrders)
    }

    if(!data.next && allOrders.length > 0) { 
      data.results = allOrders
    }

    return data

  } catch (error) {
    console.log(error)
  }
}

export async function getUserData(currentBrokage: string | undefined, authToken: string = '') {
  if(!currentBrokage) {
    throw Error('No current brokerage')
  }

  if(!authToken) {
    throw Error('authToken is missing.')
  }

  const fetchedData = await Promise.all(
    Object.entries(BROKERAGES_VARS[currentBrokage].endpoints).map(async ([key, value]) => {
      const data = await fetchData(authToken, value)
      return { [key]: data };
    })
  );
  
  const timeSynced = new Date();

  const allData = {
    [`fetchedData-${currentBrokage}`]: {
      data: Object.assign({}, ...fetchedData),
      timeSynced: timeSynced.toISOString()
    }    
  }
  
  if(allData) {
    chrome.storage.local.set(allData)
    return 'success!'
  } else {
    return 'failed!'
  }
}