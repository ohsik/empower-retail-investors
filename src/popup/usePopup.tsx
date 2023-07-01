import { useState, useEffect } from 'react';
import { brokerageUrls } from '../../lib/consts/brokerages';
import { getCurrentBrokerage } from '../../lib/helpers/get-current-brokerage';
import { localFetchedDataName } from '../../lib/consts/local-storage-var';

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
  const [syncedTime, setSyncedTime] = useState<string>('')
  const [syncErrorMessage, setSyncErrorMessage] = useState(null)
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [currentBrokage, setCurrentBrokage] = useState<keyof typeof brokerageUrls | undefined>(undefined);
  const [isCurrentBrokageSupported, setIsCurrentBrokageSupported] = useState<boolean>(false);

  useEffect(() => {
    // Check if the fetchedData exists already
    chrome.storage.local.get((items) => {
      const allKeys = Object.keys(items);
      const currentBrokageDataKey = localFetchedDataName(currentBrokage);
      setIsFetchDataExist(allKeys.some((k) => k === currentBrokageDataKey))

      if(currentBrokage) {
        setSyncedTime(items[currentBrokageDataKey].timeSynced)
      }
    });

    async function setCurrentBrokerage() {
      const { currentUrl, currentBrokage, isCurrentBrokageSupported } = await getCurrentBrokerage();
      setCurrentUrl(currentUrl)
      setCurrentBrokage(currentBrokage)
      setIsCurrentBrokageSupported(isCurrentBrokageSupported)
    }

    setCurrentBrokerage();
  }, [currentBrokage, currentUrl])

  function syncData() {
    setIsSyncing(true)

    const fetchUserData: FetchUserDataTypes = {
      FETCH_USER_DATA: {
        brokerage: currentBrokage as keyof typeof brokerageUrls,
        url: brokerageUrls[currentBrokage as keyof typeof brokerageUrls],
      }
    }

    port.postMessage(fetchUserData);
    
    port.onMessage.addListener((message)=>  {
      if(message && !message.error) {
        setSyncedTime(message[localFetchedDataName(currentBrokage)].timeSynced)
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
    currentBrokage,
    isFetchDataExist,
    currentUrl,
    syncErrorMessage,
    syncedTime,
    isCurrentBrokageSupported,
  }
}