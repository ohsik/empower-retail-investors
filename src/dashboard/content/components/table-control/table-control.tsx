import React, { useContext } from "react";
import { CSVLink } from "react-csv";

import { Data, DataArrays } from "../../../../../lib/types";
import { sidebarMenu } from "../../../../../lib/consts/sidebar-menu";
import { useLocation } from "react-router-dom";
import { SelectedDataContext } from "../../../context";
import { SlashDivider } from "../../../../../lib/ui/slash-divider";

type TableControlProps = DataArrays & {
  showTable: boolean;
  showHide: () => void;
};

export function TableControl({ showTable, data, showHide }: TableControlProps): JSX.Element {
  const location = useLocation();
  const { selectedBrokerage, selectedTimeDuration } = useContext(SelectedDataContext);

  const currentRoute = location.pathname;
  const tradingType = sidebarMenu.find((item) => item.url === currentRoute)?.name as keyof Data;
  const isWithinAIQuestionLimit = data && JSON.stringify(data).length < 10000;

  return (
    <div className="text-right text-xs grid grid-cols-[1fr,130px,60px] justify-end items-center my-4">
      <div className="opacity-50">
      </div>

      {data && 
        <CSVLink data={data} filename={`${tradingType} - ${selectedBrokerage} - ${selectedTimeDuration} - Empower Retail Investors`}>
          <span className="mr-2 border rounded-3xl px-4 py-[5px]">Download CSV</span>
        </CSVLink>
      }

      <button onClick={showHide} className="border rounded-3xl px-4 text-lg">{showTable ? '🙉' : '🙈'}</button>
    </div>
  )
};