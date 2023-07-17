import React from "react";
import { SlashDivider } from "../../../../../lib/ui/slash-divider";
import { DataArrays } from "../../../../../lib/types";
import { totalSumOfProfitOrLoss } from "../../../../../lib/helpers/total-sum-of-profit-or-loss";
import { dateKeyConvert } from "../../../../../lib/helpers/split-weekly-date-range";
import { PriceColored } from "../../../../../lib/ui/price-colored";

type SummaryProps = DataArrays & {
  timeKey?: string;
  dataKey?: string;
  tradingType?: string;
}

export function Summary({ data, timeKey, dataKey }: SummaryProps): JSX.Element {
  const results = totalSumOfProfitOrLoss(data);
  const isDataTrades = results?.isTradeData;
  const profitOrLoss = results?.totalPL;

  return (
    <div className="grid grid-cols-[4fr,8fr] gap-1 w-full rounded border shadow-sm capitalize dark:border-zinc-700">
      <div className="p-8 border-gray-300">
        <h2 className="text-xs capitalize mb-1">
          Data from
        </h2>
        <p className="text-xl font-semibold my-1 text-primary">
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
        <p className={`text-2xl font-bold`}><PriceColored price={profitOrLoss ?? 0} /></p>

        {isDataTrades &&
          (
            profitOrLoss ? 
              <p className="mt-1 text-sm">
                🏆 Wins: <b>{results.wins}</b> (<PriceColored price={results.totalWinAmount ?? 0} />) <SlashDivider /> 
                😭 Losses: <b>{results.losses}</b> (<PriceColored price={results.totalLossAmount ?? 0} />) <SlashDivider /> 
                🌟 Winning Percentage: <b>{results.winningPercentage}%</b>
              </p> 
            :
            <p className="mt-1 text-sm">🤷‍♀️ No P/L trades</p>
          )
        }

        {!isDataTrades && <p className="mt-1 text-sm opacity-50 italic">Total amount of selected time duration</p>}
      </div>
    </div>
  )
}