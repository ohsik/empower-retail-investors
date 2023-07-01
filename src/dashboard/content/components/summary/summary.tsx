import React from "react";

export function Summary(): JSX.Element {
  return (
    <div className="grid grid-cols-[1fr,1fr] gap-1 w-full rounded border mb-10">
      <div className="p-6">
        <h2 className="text-xs uppercase mb-1 font-bold">Total Profit/Loss</h2>
        <p className="text-3xl my-2">$200.00</p>
        <small>Dec 20, 2023 to Dec 30, 2023</small>
      </div>
      <div className="p-6">
        <h2 className="text-xs uppercase mb-2 font-bold">Trading Performance</h2>
        <p>
          🚀 Wins: 11 ($66,651.77)<br />
          💔 Losses: 15 (-$74,283.45)<br />
          🌟 Winning Percentage: 42%
        </p>
      </div>
    </div>
  )
}