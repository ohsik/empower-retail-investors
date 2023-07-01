import React from "react";
import { Link } from 'react-router-dom';
import { Brokerages, brokerageNames } from "../../../lib/consts/brokerages";

type SidebarProps = {
  availableBrokerages: Brokerages[] | undefined;
};

export const sidebarManu = [
  { key: 'portfolio', name: '💼 Portfolio', url: `/` },
  { key: 'stocks', name: '📈 Stocks', url: `/stocks` },
  { key: 'options', name: '⏳ Options', url: `/options` },
  { key: 'crypto', name: '🌎 Crypto', url: `/crypto` },
  { key: 'dividends', name: '💵 Dividends', url: `/dividends` },
  { key: 'subscriptionFees', name: '💸 Subscription fees', url: `/subscription-fees` },
  { key: 'marginInterest', name: '💳 Margin interest', url: `/margin-interest` },
  { key: 'about', name: '😻 About', url: `/about` }
];

export function Sidebar({ availableBrokerages }: SidebarProps ): JSX.Element {
  return (
    <div className="p-10">
      <div className="mb-6 font-bold text-lg text-primary mt-[-10px]">
        <span className="block text-[40px]">🚀</span>
        Empower<br />Retail<br />Investors
      </div>

      <div className="mb-6">
        <select id="brokerageSelect" className="border rounded p-2 w-[140px] dark:bg-neutral-900 dark:text-slate-300">
          {availableBrokerages?.map((brokerage) => (
            <option key={brokerage} value={brokerage}>
              {brokerageNames[brokerage]}
            </option>
          ))}
        </select>
      </div>

      {sidebarManu.map((item, index) => (
        <li className="list-none my-3 underline" key={index}>
          <Link to={item.url}>{item.name}</Link>
        </li>
      ))}
    </div>
  )
}