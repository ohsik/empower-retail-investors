import React from "react";

export function Summary(): JSX.Element {
  return (
    <div className="grid grid-cols-[1fr,1fr,1fr] gap-1 w-full rounded border mb-10">
      <div className="p-6">
      <h2 className="text-xs uppercase mb-2 font-bold">Time Frame</h2>
        <p>Dec 20, 2023</p>
      </div>
      <div className="p-6">
        <h2 className="text-xs uppercase mb-2 font-bold">Total Profit/Loss</h2>
        <p className="text-2xl">$200.00</p>
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