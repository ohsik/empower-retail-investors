import React from "react";
import { Option } from "../../../../../lib/types";

export interface TableProps {
  data: (Option[] | undefined);
}

export function Table({ data }: TableProps): JSX.Element {
  return (
    <table className="w-full rounded">
      <thead>
        <tr className="text-xxs text-left border-b border-slate-500 border-opacity-40 uppercase">
          <th className="p-4">Symbol</th>
          {/* <th className="p-4">Quantity</th>
          <th className="p-4">Price</th>
          <th className="p-4">Side</th>
          <th className="p-4">Fees</th>
          <th className="p-4">Date</th>
          <th className="p-4">Profit/Loss</th> */}
        </tr>
      </thead>
      <tbody>
        {data?.map((trade) => {
          return (
            <tr className="border-b border-slate-500 border-opacity-40" key={trade.id} id={trade.id}>
              <td className="p-4">{trade.symbol}</td>
              {/* <td className="p-4">{trade.quantity}</td>
              <td className="p-4">{trade.price}</td>
              <td className="p-4">{trade.side}</td>
              <td className="p-4">{trade.fees}</td>
              <td className="p-4">{trade.executionDate}</td>
              <td className="p-4">{trade.profitOrLoss ?? 0}</td> */}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}