import { useState, useEffect } from 'react';
import { brokerageUrls, supportedBrokerages } from '../../lib/consts/brokerages';

type UsePopupReturns = {
  syncData: () => void;
  viewReports: () => void;
  isSyncing: boolean;
  currentBrokage: keyof typeof brokerageUrls | undefined;
  isFetchDataExist: boolean;
  currentUrl: string | null;
  syncErrorMessage: string | null;
  syncedTime?: string;
  isCurrentBrokageSupported: boolean;
};

// Establish connection so popup can communicate with background
const port = chrome.runtime.connect();

export function usePopup(): UsePopupReturns {
  const [isSyncing, setIsSyncing] = useState(false)
  const [isFetchDataExist, setIsFetchDataExist] = useState(false)
  const [syncedTime, setSyncedTime] = useState('')
  const [syncErrorMessage, setSyncErrorMessage] = useState(null)
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const currentBrokage = (Object.keys(brokerageUrls) as Array<keyof typeof brokerageUrls>).find((brokerage) => currentUrl?.includes(brokerageUrls[brokerage]));
  const isCurrentBrokageSupported = supportedBrokerages.includes(currentBrokage as keyof typeof brokerageUrls);

  useEffect(() => {
    // Check if the fetchedData exists already
    chrome.storage.local.get((items) => {
      const allKeys = Object.keys(items);
      setIsFetchDataExist(allKeys.some((k) => k === `${currentBrokage}+fetchedData`))

      if(items?.fetchedData?.timeSynced) {
        setSyncedTime(items.fetchedData.timeSynced)
      }
    });

    // Get the current tab url
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabUrl = tabs[0].url;
        setCurrentUrl(tabUrl ?? null)
      }
    });
  }, [])

  function syncData() {
    setIsSyncing(true)
    port.postMessage(
      {
        FETCH_USER_DATA: {
          brokerage: currentBrokage,
          url: brokerageUrls[currentBrokage as keyof typeof brokerageUrls],
        }
      }
    );
    
    port.onMessage.addListener((message)=>  {
      if(message && !message.error) {
        setIsFetchDataExist(true)
        setIsSyncing(false)
  
        // Adding a hack cause it does not read updated date from fetchedData
        const timeSynced = new Date();
        setSyncedTime(timeSynced.toISOString())
      } else {
        setSyncErrorMessage(message.error)
        setIsSyncing(false)
      }
    })
  }

  function viewReports() {
    chrome.tabs.create({url: "app.html"});
  }

  return {
    syncData,
    viewReports,
    isSyncing,
    currentBrokage,
    isFetchDataExist,
    currentUrl,
    syncErrorMessage,
    syncedTime,
    isCurrentBrokageSupported,
  }
}