import React from "react";
import { Brokerages, brokerageNames } from "../../../lib/consts/brokerages";

type SidebarProps = {
  availableBrokerages: Brokerages[] | undefined;
};

export function Sidebar({ availableBrokerages }: SidebarProps ): JSX.Element {
  const sidebarManu = [
    '💼 Portfolio',
    '📈 Stocks',
    '⏳ Options',
    '🌎 Crypto',
    '💵 Dividends',
    '💸 Subscription fees',
    '💳 Margin interest',
    '😻 About'
  ];

  return (
    <div className="p-10">
      <div className="mb-6 font-bold text-lg text-primary mt-[-10px]">
        <span className="block text-[40px]">🚀</span>
        Empower<br />Retail<br />Investors
      </div>

      <div className="mb-6">
        <select id="brokerageSelect" className="border rounded p-2 w-[140px] dark:bg-neutral-900 dark:text-white">
          {availableBrokerages?.map((brokerage) => (
            <option key={brokerage} value={brokerage}>
              {brokerageNames[brokerage]}
            </option>
          ))}
        </select>
      </div>

      {sidebarManu.map((item, index) => (
        <li className="list-none my-3 underline" key={index}>
          <a href="#">{item}</a>
        </li>
      ))}
    </div>
  )
}