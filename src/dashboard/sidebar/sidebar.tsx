import React from "react";

export function Sidebar(): JSX.Element {
  const sidebarManu = [
    'Portfolio',
    'Stocks',
    'Options',
    'Crypto',
    'Dividends',
    'Subscription fees',
    'Margin interest',
    'About'
  ];

  return (
    <div className="p-10">
      <div className="mb-10 font-bold text-lg text-primary mt-[-10px]">
        <span className="block text-[40px]">🚀</span>
        Empower Retail Investors
      </div>

      {sidebarManu.map((item, index) => (
        <li className="list-none my-3 underline" key={index}>
          <a href="#">{item}</a>
        </li>
      ))}
    </div>
  )
}