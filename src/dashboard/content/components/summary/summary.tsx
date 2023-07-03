import React from "react";
import { SlashDivider } from "../../../../../lib/ui/slash-divider";
import { Data } from "../../../../../lib/types";

interface SummaryProps {
  brokerage?: string;
  data?: Data | undefined;
}

export function Summary({ brokerage, data }: SummaryProps): JSX.Element {
  return (
    <div className="grid grid-cols-[5fr,7fr] gap-1 w-full rounded border mb-6 capitalize">
      <div className="p-8 border-r border-gray-300">
        <h2 className="text-xs uppercase mb-1 font-bold">Total Profit/Loss {brokerage && <i><SlashDivider /> <b className="text-primary">{brokerage}</b></i>}</h2>
        <p className="text-2xl font-bold">$200.00</p>
      </div>
      <div className="p-8">
        <h2 className="text-xs uppercase mb-1 font-bold">Trading Performance <SlashDivider /> <span className="italic">Dec 20, 2023 to Dec 30, 2023</span></h2>
        
        <p className="mt-2">
          🚀 Wins: 11 ($66,651.77) 
          💔 Losses: 15 (-$74,283.45)
          🌟 Winning Percentage: 42%
        </p>
      </div>
    </div>
  )
}