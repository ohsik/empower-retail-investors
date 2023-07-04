import React, { useContext } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Brokerages, brokerageNames } from "../../../lib/consts/brokerages";
import { SelectedDataContext } from "../context";
import { sidebarMenu } from "../../../lib/consts/sidebar-menu";
import { Data } from "../../../lib/types";

type SidebarProps = {
  availableBrokerages: Brokerages[] | undefined;
};

export function Sidebar({ availableBrokerages }: SidebarProps ): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  const dataKey = sidebarMenu.find((item) => item.url === currentRoute)?.key as keyof Data;
  
  const { selectedBrokerage, selectedTimeDuration } = useContext(SelectedDataContext);

  return (
    <div className="p-10 fixed">
      <div className="mb-6 font-bold text-lg text-primary mt-[-10px]">
        <Link to="/">
          <span className="block text-[40px]">🚀</span>
          Empower<br />Retail<br />Investors
        </Link>
      </div>

      <div className="mb-6">
        <select 
          id="brokerageSelect" 
          className="rounded p-2 w-[140px] bg-primary hover:bg-primary-dark text-slate-100"
          value={selectedBrokerage}
          onChange={(e) => navigate(`?brokerage=${e.target.value}&timeduration=${selectedTimeDuration}`)}
        >
          {availableBrokerages?.map((brokerage) => (
            <option key={brokerage} value={brokerage}>
              {brokerageNames[brokerage]}
            </option>
          ))}
        </select>
      </div>

      {sidebarMenu.map((item, index) => (
        <li className="list-none my-3" key={index}>
          <Link to={`${item.url}?brokerage=${selectedBrokerage}&timeduration=${selectedTimeDuration}`}>
            {dataKey === item.key ? <b>{item.name}</b>: <span className="underline">{item.name}</span>}
          </Link>
        </li>
      ))}
    </div>
  )
}