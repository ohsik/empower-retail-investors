import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from 'react-router-dom';

import { BROKERAGES_VARS } from "../../../lib/brokerages";
import { AllData, Data } from "../../../lib/types";
import { Brokerages } from "../../../lib/consts/brokerages";
import { TimeDurationSelectType } from "../../../lib/consts/time-duration-select";
import { dataByTimeDuration } from "../../../lib/helpers/data-by-time-duration";

type UseHomeReturn = {
  data: AllData | undefined;
  originalTransformedData: AllData | undefined;
  isLoading: boolean;
  availableBrokerages: Brokerages[] | undefined;
  selectedBrokerage: Brokerages;
  selectedTimeDuration: TimeDurationSelectType;
  setSelectedTimeDuration: (timeDuration: TimeDurationSelectType) => void;
};

export function useHome(): UseHomeReturn {
  const [fetchedData, setFetchedData] = useState<any>();
  const [originalTransformedData, setOriginalTransformedData] = useState<AllData>({});
  const [copiedOriginalTransformedData, setCopiedOriginalTransformedData] = useState<AllData>({});
  const [transformedData, setTransformedData] = useState<AllData>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const [timeDuration, setTimeDuration] = useState<TimeDurationSelectType>(searchParams.get('timeduration') as TimeDurationSelectType ?? TimeDurationSelectType.All);

  const selectedBrokerage = searchParams.get('brokerage') as Brokerages ?? Brokerages.All;

  useEffect(() => {
    chrome.storage.local.get((items) => {
      // grab trading data from chrome storage
      const filteredData = Object.fromEntries(
        Object.entries(items).filter(([key]) => key.startsWith("fetchedData-"))
      );

      setFetchedData(filteredData);
    });
  }, []);

  useEffect(() => {
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

      setOriginalTransformedData(data);
      setIsLoading(false);
    }
  }, [fetchedData]);

  const updateSelectedTimeDuration = useCallback(
    async (selectedTimeDuration: TimeDurationSelectType) => {
      if (originalTransformedData) {
        const clonedOrigialTransformedData = structuredClone(originalTransformedData);

        // Because originalTransformedData is set in useEffect, it is not available in the first render
        // Had to copy that to another state to pass through context that can be used in other components
        setCopiedOriginalTransformedData(clonedOrigialTransformedData);

        setIsLoading(true);
        setTimeDuration(selectedTimeDuration);

        const transformDataByDuration = async () => {
          const newData: AllData = {};

          for (const dataKey of Object.keys(clonedOrigialTransformedData)) {
            const results = await Promise.all(
              Object.keys(clonedOrigialTransformedData[dataKey]).map(async (order) => {
                const dataByDuration = await dataByTimeDuration(
                  selectedTimeDuration,
                  clonedOrigialTransformedData[dataKey][order as keyof Data]
                );
                return { [order]: dataByDuration };
              })
            );

            newData[dataKey] = Object.assign({}, ...results);
          }

          setTransformedData(newData);
          setIsLoading(false);
        };

        transformDataByDuration();
      }
    },
    [originalTransformedData]
  );

  useEffect(() => {
    updateSelectedTimeDuration(timeDuration);
  }, [updateSelectedTimeDuration, timeDuration]);

  const availableBrokerages = transformedData && Object.keys(transformedData) as Brokerages[];
  // Add 'All Brokerages' option to the dropdown
  const availableBrokeragesWithAll = availableBrokerages && [Brokerages.All, ...availableBrokerages];
  
  return {
    data: transformedData,
    originalTransformedData: copiedOriginalTransformedData,
    isLoading,
    availableBrokerages: availableBrokeragesWithAll,
    selectedBrokerage,
    selectedTimeDuration: timeDuration,
    setSelectedTimeDuration: updateSelectedTimeDuration,
  };
}
