import React from "react";
import { SlashDivider } from "../../../../../lib/ui/slash-divider";
import { DataArrays } from "../../../../../lib/types";
import { totalSumOfProfitOrLoss } from "../../../../../lib/helpers/total-sum-of-profit-or-loss";
import { toUSD } from "../../../../../lib/helpers/to-usd";
import { dateKeyConvert } from "../../../../../lib/helpers/split-weekly-date-range";

type SummaryProps = DataArrays & {
  timeKey?: string;
  dataKey?: string;
  tradingType?: string;
}

export function Summary({ data, timeKey, dataKey }: SummaryProps): JSX.Element {
  const profitOrLoss = totalSumOfProfitOrLoss(data);

  return (
    <div className="grid grid-cols-[4fr,8fr] gap-1 w-full rounded border shadow-sm capitalize dark:border-zinc-700">
      <div className="p-8 border-gray-300">
        <h2 className="text-xs capitalize mb-1">
          Data from
        </h2>
        <p className="text-xl font-semibold my-1">
          {/* 🏦 */}
          {dataKey}
        </p>
        <p className="text-xl font-semibold my-1">
          {/* 🗓️ */}
          {timeKey === 'all'? 'All Time' : dateKeyConvert(timeKey ?? '')}
        </p>
      </div>
      <div className="p-8">
        <h2 className="text-xs capitalize mb-1">Total Profit/Loss</h2>
        <p className={`text-2xl font-bold ${profitOrLoss && (profitOrLoss === 0 ? `text-[inherit]` : (profitOrLoss > 0 ? `text-[#22c55d]` : `text-[#ef4444]`))}`}>{toUSD(profitOrLoss ?? 0)}</p>
        <p className="mt-1 text-sm opacity-50">
          {/* 🚀 Wins: 11 ($66,651.77) <SlashDivider /> 
          💔 Losses: 15 (-$74,283.45) <SlashDivider /> 
          🌟 Winning Percentage: 42% */}
          🌟 Trading Performance coming soon...
        </p>
      </div>
    </div>
  )
}