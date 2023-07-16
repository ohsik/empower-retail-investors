import React, { useContext } from "react";
import { SelectedDataContext } from "../../../context";
import { useLocation } from "react-router-dom";
import { sidebarMenu } from "../../../../../lib/consts/sidebar-menu";
import { Data } from "../../../../../lib/types";
import { SlashDivider } from "../../../../../lib/ui/slash-divider";

export function NoTrades({ dataKey }: { dataKey?: string }): JSX.Element {
  const { selectedBrokerage, selectedTimeDuration } = useContext(SelectedDataContext);
  const location = useLocation();
  const currentRoute = location.pathname;
  const routeName = sidebarMenu.find((item) => item.url === currentRoute)?.name as keyof Data;
  
  return (
    <div className='grid items-center h-[200px] mt-1 text-sm text-center'>
      <div>🤷‍♀️ No data yet for <b className="capitalize">{routeName} <SlashDivider /> {dataKey ?? selectedBrokerage} <SlashDivider /> {selectedTimeDuration} </b></div>
    </div>
  )
}