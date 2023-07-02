import React from "react";
import { Crypto } from "../../../../../lib/types";
import { formatDate } from "../../../../../lib/helpers/date-format";
import { toUSD } from "../../../../../lib/helpers/to-usd";

export interface TableProps {
  data: (Crypto[] | undefined);
}

export function Table({ data }: TableProps): JSX.Element {
  return (
    <table className="w-full rounded">
      <thead>
        <tr className="text-xxs text-left border-b border-slate-500 border-opacity-40 uppercase">
          <th className="p-4">Symbol</th>
          <th className="p-4">Quantity</th>
          <th className="p-4">Price</th>
          <th className="p-4">Side</th>
          <th className="p-4">Fees</th>
          <th className="p-4">Date</th>
          <th className="p-4">Profit/Loss</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((trade) => {
          return (
            <tr className="border-b border-slate-500 border-opacity-40" key={trade.id} id={trade.id}>
              <td className="p-4">{trade.symbol}</td>
              <td className="p-4">{trade.quantity}</td>
              <td className="p-4">{toUSD(trade.price)}</td>
              <td className="p-4">{trade.side}</td>
              <td className="p-4">{trade.fees}</td>
              <td className="p-4">{formatDate(trade.executionDate)}</td>
              <td className="p-4">{toUSD(trade.profitOrLoss ?? 0)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}