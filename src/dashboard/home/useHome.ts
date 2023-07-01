import { useEffect, useState, useMemo } from "react";
import { BROKERAGES_VARS } from "../../../lib/brokerages";
import { Data } from "../../../lib/types";

type UseHomeReturn = {
  data: Data | undefined;
  isLoading: boolean;
};

export function useHome(): UseHomeReturn {
  const [fetchedData, setFetchedData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    chrome.storage.local.get((items) => {
      // grab trading data from chrome storage
      const filteredData = Object.fromEntries(
        Object.entries(items).filter(([key]) => key.startsWith("fetchedData-"))
      );

      setFetchedData(filteredData);
      setIsLoading(false);
    });
  }, []);

  const transformedData = useMemo(() => {
    if (fetchedData) {
      setIsLoading(true);

      const cloneData = structuredClone(fetchedData);
      const regex = /fetchedData-(\w+)/;
      let data: Record<string, Data> = {};

      // transform data based on brokerage
      Object.keys(cloneData).forEach((key) => {
        const match = key.match(regex);

        if (match && match.length > 1) {
          const brokerageName = match[1];

          // calling data transform function from lib/brokerages for each brokerage
          data[brokerageName] = BROKERAGES_VARS[brokerageName]?.transformData(cloneData[key]);
        }
      });

      setIsLoading(false);
      return data;
    }
  }, [fetchedData]);

  return {
    data: transformedData,
    isLoading
  };
}
