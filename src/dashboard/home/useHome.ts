import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from 'react-router-dom';

import { BROKERAGES_VARS } from "../../../lib/brokerages";
import { AllData } from "../../../lib/types";
import { Brokerages } from "../../../lib/consts/brokerages";
import { TimeDurationSelectType } from "../../../lib/consts/time-duration-select";

type UseHomeReturn = {
  data: AllData | undefined;
  isLoading: boolean;
  availableBrokerages: Brokerages[] | undefined;
  selectedBrokerage: Brokerages;
  selectedTimeDuration: TimeDurationSelectType;
  setSelectedTimeDuration: (timeDuration: TimeDurationSelectType) => void;
};

export function useHome(): UseHomeReturn {
  const [fetchedData, setFetchedData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const [timeDuration, setTimeDuration] = useState<TimeDurationSelectType>(searchParams.get('timeDuration') as TimeDurationSelectType ?? TimeDurationSelectType.All);

  // TODO: might need to add setSelectedBrokerage function and hook it up to DataSelectedContext
  // Just like setSelectedTimeDuration. For now, it's fine.
  const selectedBrokerage = searchParams.get('brokerage') as Brokerages ?? Brokerages.All;

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
      let data: AllData = {};

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

  const availableBrokerages = transformedData && Object.keys(transformedData) as Brokerages[];
  // Add 'All Brokerages' option to the dropdown
  const availableBrokeragesWithAll = availableBrokerages && [Brokerages.All, ...availableBrokerages];

  function setSelectedTimeDuration(selectedTimeDuration: TimeDurationSelectType) {
    setTimeDuration(selectedTimeDuration)
  }

  return {
    data: transformedData,
    isLoading,
    availableBrokerages: availableBrokeragesWithAll,
    selectedBrokerage,
    selectedTimeDuration: timeDuration,
    setSelectedTimeDuration,
  };
}
