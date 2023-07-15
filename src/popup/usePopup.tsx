import { useState, useEffect } from 'react';
import { brokerageUrls } from '../../lib/consts/brokerages';
import { getCurrentBrokerage } from '../../lib/helpers/get-current-brokerage';
import { localFetchedDataName } from '../../lib/consts/local-storage-var';

type UsePopupReturns = {
  syncData: () => void;
  viewReports: () => void;
  isSyncing: boolean;
  currentBrokerage: keyof typeof brokerageUrls | undefined;
  isFetchDataExist: boolean;
  currentUrl: string | null;
  syncErrorMessage: string | null;
  timeSynced?: string;
  isCurrentBrokerageSupported: boolean;
};

type FetchUserDataTypes = {
  FETCH_USER_DATA: {
    brokerage: keyof typeof brokerageUrls;
    url: string;
  }
};

// Establish connection so popup can communicate with background
const port = chrome.runtime.connect();

export function usePopup(): UsePopupReturns {
  const [isSyncing, setIsSyncing] = useState(false)
  const [isFetchDataExist, setIsFetchDataExist] = useState(false)
  const [timeSynced, settimeSynced] = useState<string>('')
  const [syncErrorMessage, setSyncErrorMessage] = useState(null)
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [currentBrokerage, setCurrentBrokerage] = useState<keyof typeof brokerageUrls | undefined>(undefined);
  const [isCurrentBrokerageSupported, setIsCurrentBrokerageSupported] = useState<boolean>(false);

  useEffect(() => {
    // Check if the fetchedData exists already
    chrome.storage.local.get((items) => {
      const allKeys = Object.keys(items);
      const currentBrokerageDataKey = localFetchedDataName(currentBrokerage);
      setIsFetchDataExist(allKeys.some((k) => k === currentBrokerageDataKey))

      if(currentBrokerage) {
        settimeSynced(items[currentBrokerageDataKey]?.timeSynced)
      }
    });

    async function setCurrentLocalBrokerage() {
      const { currentUrl, currentBrokerage, isCurrentBrokerageSupported } = await getCurrentBrokerage();
      setCurrentUrl(currentUrl)
      setCurrentBrokerage(currentBrokerage)
      setIsCurrentBrokerageSupported(isCurrentBrokerageSupported)
    }

    setCurrentLocalBrokerage();
  }, [currentBrokerage, currentUrl])

  function syncData() {
    setIsSyncing(true)

    const fetchUserData: FetchUserDataTypes = {
      FETCH_USER_DATA: {
        brokerage: currentBrokerage as keyof typeof brokerageUrls,
        url: brokerageUrls[currentBrokerage as keyof typeof brokerageUrls],
      }
    }

    port.postMessage(fetchUserData);
    
    port.onMessage.addListener((message)=>  {
      if(message && !message.error) {
        settimeSynced(message[localFetchedDataName(currentBrokerage)]?.timeSynced)
        setIsFetchDataExist(true)
        setIsSyncing(false)
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
    currentBrokerage,
    isFetchDataExist,
    currentUrl,
    syncErrorMessage,
    timeSynced,
    isCurrentBrokerageSupported,
  }
}