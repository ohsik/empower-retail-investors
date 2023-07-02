import React from "react";
import { SlashDivider } from "../../../../../lib/ui/slash-divider";

interface SummaryProps {
  brokerage?: string;
}

export function Summary({ brokerage }: SummaryProps): JSX.Element {
  return (
    <div className="grid grid-cols-[1fr,1fr] gap-1 w-full rounded border mb-10 capitalize">
      <div className="p-6">
        <h2 className="text-xs uppercase mb-1 font-bold">Total Profit/Loss {brokerage && <i><SlashDivider /> <b className="text-primary">{brokerage}</b></i>}</h2>
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