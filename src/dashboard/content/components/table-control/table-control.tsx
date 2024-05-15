import React, { useContext } from "react";
import { CSVLink } from "react-csv";

import { Data, DataArrays, Option } from "../../../../../lib/types";
import { sidebarMenu } from "../../../../../lib/consts/sidebar-menu";
import { useLocation } from "react-router-dom";
import { SelectedDataContext } from "../../../context";

type TableControlProps = DataArrays & {
  showTable: boolean;
  showHide: () => void;
};

export function TableControl({ showTable, data, showHide }: TableControlProps): JSX.Element {
  const location = useLocation();
  const { selectedBrokerage, selectedTimeDuration } = useContext(SelectedDataContext);

  const currentRoute = location.pathname;
  const tradingType = sidebarMenu.find((item) => item.url === currentRoute)?.name as keyof Data;
  const tradingTypeKey = sidebarMenu.find((item) => item.url === currentRoute)?.key as keyof Data;

  // Convert legs object to string for CVS download
  function convertLegsObjToString(data: any): any {
    const dataCloned = structuredClone(data);

    dataCloned.forEach((option: any, index: number) => {
      option.legs.forEach((leg: any, legIndex: number) => {
        const legName = `leg${legIndex + 1}`;
        dataCloned[index][legName] = JSON.stringify(leg).replaceAll(',', ' | ');
      });

      delete option.legs;
    });

    return dataCloned
  }

  return (
    <div className="text-right text-xs grid grid-cols-[1fr,130px,60px] justify-end items-center my-4">
      <div className="opacity-50">
      </div>

      {data && 
        <CSVLink data={tradingTypeKey === `options` ? convertLegsObjToString(data) : data} filename={`${tradingType} - ${selectedBrokerage} - ${selectedTimeDuration} - Empower Retail Investors`}>
          <span className="mr-2 border rounded-3xl px-4 py-[5px]">Download CSV</span>
        </CSVLink>
      }

      <button onClick={showHide} className="border rounded-3xl px-4 text-lg">{showTable ? '🙉' : '🙈'}</button>
    </div>
  )
};