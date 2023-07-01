import { useEffect, useState } from "react";
import { BROKERAGES_VARS } from "../../../lib/brokerages";
import { Data } from "../../../lib/types";

type UseHomeReturn = { 
  data: Data | undefined;
  isLoading: boolean;
};

export function useHome(): UseHomeReturn {
  const [fetchedData, setFetchedData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data | undefined>(undefined);

  useEffect(() => {
    chrome.storage.local.get((items) => {
      // grab trading data from chrome storage
      const filteredData = Object.fromEntries(
        Object.entries(items).filter(([key]) => key.startsWith('fetchedData-'))
      );

      setFetchedData(filteredData);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (fetchedData) {
      setIsLoading(true);

      const cloneData = structuredClone(fetchedData);
      const regex = /fetchedData-(\w+)/;

      // transform data based on brokerage
      Object.keys(cloneData).forEach((key) => {
        const match = key.match(regex);

        if (match && match.length > 1) {
          const brokerageName = match[1];

          // calling data transform function from lib/brokerages for each brokerage
          cloneData[key] = BROKERAGES_VARS[brokerageName]?.transformData(cloneData[key]);
        }
      });

      setIsLoading(false);
      setData(cloneData);
    }
  }, [fetchedData]);

  return {
    data,
    isLoading
  };
}
