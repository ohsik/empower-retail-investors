import { useContext } from "react";
import { useLocation } from "react-router-dom"
import { SelectedDataContext } from "../../src/dashboard/context";

import { AllData, Data, DataWithKeys } from "../types"
import { sidebarMenu } from "../consts/sidebar-menu";

/*
  This will be execute right before all table and summary components get data.
  if All Brokerages is selected, it will add brokerage name to the data.
  
  [robinhood]: data[robinhood][stocks]
*/
export function handleContentSelectData(data: AllData | undefined): DataWithKeys | undefined {
  const location = useLocation();
  const { selectedBrokerage } = useContext(SelectedDataContext);

  const currentRoute = location.pathname;
  const dataKey = sidebarMenu.find((item) => item.url === currentRoute)?.key as keyof Data;

  if (selectedBrokerage === 'all' && data && dataKey) {
    const allDataKeyData = Object.keys(data).map((key, _index) => {
      return { 
        [key]: data?.[key]?.[dataKey]
      }
    });

    return Object.assign({}, ...allDataKeyData)
  }

  return { [selectedBrokerage]: data?.[selectedBrokerage]?.[dataKey] }
}