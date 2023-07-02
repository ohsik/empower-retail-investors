import { useContext } from "react";
import { useLocation } from "react-router-dom"
import { SelectedDataContext } from "../../src/dashboard/context";

import { AllData, Data } from "../types"
import { sidebarMenu } from "../consts/sidebar-menu";

type handleContentSelectDataReturn = {
  isMutipleBrokerages: boolean;
  selectedData: Data;
} | undefined;

/*
  This will be execute right before all table and summary components get data.
  To ensure to cover all brockerages data that combine data from all brockeraes users have on their Chrome local storage
*/
export function handleContentSelectData(data: AllData | undefined): handleContentSelectDataReturn {
  const location = useLocation();
  const { selectedBrokerage } = useContext(SelectedDataContext);

  const currentRoute = location.pathname;
  const dataKey = sidebarMenu.find((item) => item.url === currentRoute)?.key as keyof Data;

  if (selectedBrokerage === 'all' && data && dataKey) {
    const selectedData = Object.entries(data).map(([ brokerage, data ]) => {
      return {
        [brokerage]: data[dataKey]
      }
    }) as Data;

    return {
      isMutipleBrokerages: true,
      selectedData,
    }
  }

  return {
    isMutipleBrokerages: false,
    selectedData: data?.[selectedBrokerage]?.[dataKey] as Data
  }
}