import React, { useContext } from "react";
import { useLocation, useSearchParams } from 'react-router-dom';

import { Select } from "../../../../../lib/ui/select";
import { SelectedDataContext } from "../../../context";
import { TimeDurationSelectType, timeDurationSelect } from "../../../../../lib/consts/time-duration-select";
import { sidebarMenu } from "../../../../../lib/consts/sidebar-menu";

export function Header(): JSX.Element {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedBrokerage, setSelectedTimeDuration } = useContext(SelectedDataContext);

  const currentRoute = location.pathname;
  const title = sidebarMenu.find((item) => item.url === currentRoute)?.name;

  function handleTimeDurationChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedTimeDuration(e.target.value as TimeDurationSelectType)
    searchParams.set('timeduration', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div className="grid grid-cols-[1fr,120px] items-center p-10 pb-0">
      <div>
        <h1 className="text-2xl font-bold capitalize">
          {title} {!currentRoute.includes('about') && <span className="font-normal text-xl">/ {selectedBrokerage === 'all' ? 'All Brokerages' : `${selectedBrokerage}`}</span>}
        </h1>
      </div>
      <div className="text-right">
        {!currentRoute.includes('about') && <Select onChange={handleTimeDurationChange} arrayData={timeDurationSelect} />}
      </div>
    </div>
  )
}