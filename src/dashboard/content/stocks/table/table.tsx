import React, { useState } from "react";
import { Stock } from "../../../../../lib/types";
import { formatDateTime } from "../../../../../lib/helpers/date-format";
import { toUSD } from "../../../../../lib/helpers/to-usd";
import { TableControl } from "../../components/table-control";

export interface TableProps {
  data: Stock[] | undefined;
}

export function Table({ data }: TableProps): JSX.Element {
  const [showTable, setShowTable] = useState(true);

  function showHide() {
    setShowTable(!showTable);
  }

  function downloadCVS() {
    alert('Download CSV file is coming soon. Stay tuned 🙌');
  }

  return (
    <div>
      <TableControl showHide={showHide} downloadCVS={downloadCVS} showTable={showTable} />
      {showTable && 
        <table className="w-full rounded border capitalize text-xs dark:border-zinc-800">
          <thead>
            <tr className="text-xxs text-left border-b uppercase dark:border-zinc-800">
              <th className="p-4 py-2">Symbol</th>
              <th className="p-4 py-2">Price</th>
              <th className="p-4 py-2">Quantity</th>
              <th className="p-4 py-2">Side</th>
              <th className="p-4 py-2">Fees</th>
              <th className="p-4 py-2">Profit/Loss</th>
              <th className="p-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((trade) => {
              return (
                <tr className={`border-b ${trade.profitOrLoss && (trade.profitOrLoss === 0 ? `bg-[inherit]` : (trade.profitOrLoss > 0 ? `bg-[#22c55d]/[.06]` : `bg-[#ef4444]/[.06]`))} dark:border-zinc-800`} key={trade.id} id={trade.id}>
                  <td className="px-4 py-5"><b>{trade.symbol}</b></td>
                  <td className="px-4 py-5">{toUSD(trade.price)}</td>
                  <td className="px-4 py-5">{Number(trade.quantity).toFixed(2)}</td>
                  <td className="px-4 py-5">{trade.side}</td>
                  <td className="px-4 py-5">{toUSD(trade.fees)}</td>
                  <td className={`px-4 py-5 font-bold ${trade.profitOrLoss && (trade.profitOrLoss === 0 ? `text-[inherit]` : (trade.profitOrLoss > 0 ? `text-[#22c55d]` : `text-[#ef4444]`))}`}>
                    {toUSD(trade.profitOrLoss ?? 0)}
                  </td>
                  <td className="px-4 py-5">{formatDateTime(trade.executionDate)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </div>
  )
}
