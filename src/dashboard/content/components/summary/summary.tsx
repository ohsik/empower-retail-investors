import React from "react";
import { SlashDivider } from "../../../../../lib/ui/slash-divider";
import { DataArrays } from "../../../../../lib/types";

type SummaryProps = DataArrays & {
  timeKey?: string;
  dataKey?: string;
}

export function Summary({ data, timeKey, dataKey }: SummaryProps): JSX.Element {
  return (
    <div className="grid grid-cols-[4fr,8fr] gap-1 w-full rounded border shadow-sm capitalize">
      <div className="p-8 border-gray-300">
        <h2 className="text-xs capitalize mb-1">
          Data from
        </h2>
        <p className="text-md font-semibold my-1">
          🏦 {dataKey}<br />
        </p>
        <p className="text-md font-semibold my-1">
          🗓️ {timeKey ?? 'All Time'}
        </p>
      </div>
      <div className="p-8">
        <h2 className="text-xs capitalize mb-1">Total Profit/Loss</h2>
        <p className="text-2xl font-bold">$200.00</p>
        <p className="mt-1">
          🚀 Wins: 11 ($66,651.77) <SlashDivider /> 
          💔 Losses: 15 (-$74,283.45) <SlashDivider /> 
          🌟 Winning Percentage: 42%
        </p>
      </div>
    </div>
  )
}