import { useEffect, useState } from "react";

export function useDashboard() {
  const [fetchedData, setFetchedData] = useState<any>();

  useEffect(() => {
    chrome.storage.local.get((items) => {
      setFetchedData(items)
    });
  }, [])

  return {
    fetchedData
  }
}
