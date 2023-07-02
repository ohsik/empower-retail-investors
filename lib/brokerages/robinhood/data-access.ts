import { BROKERAGES_VARS } from "..";
import { Brokerages } from "../../consts/brokerages";
import { localFetchedDataName } from "../../consts/local-storage-var";
import { requestHeaders } from "../../helpers/request-headers";
import { getSymbols } from "./helpers/get-symbol";

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

export async function getUserData(currentBrokage: Brokerages | undefined, authToken: string = '') {
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

  // because Robinhood doesn't provide the symbol in the orders endpoint, we need to fetch it for each order
  async function getAndAssignSymbols(fetchedData: any) {
    const dataFormatted = Object.assign({}, ...fetchedData);

    await Promise.all(
      dataFormatted.orders.results.map(async (trade: any, index: string | number) => {
        const symbol = await getSymbols(trade.instrument);

        dataFormatted.orders.results[index] = {
          ...dataFormatted.orders.results[index],
          symbol: symbol?.symbol,
          companyName: symbol?.name,
        }
      })
    );

    return dataFormatted;
  }

  const timeSynced = new Date();

  const allData = {
    [localFetchedDataName(currentBrokage)]: {
      data: await getAndAssignSymbols(fetchedData),
      timeSynced: timeSynced.toISOString()
    }    
  }

  if(allData) {
    chrome.storage.local.set(allData)
    return allData
  } else {
    return 'failed 🥲'
  }
}