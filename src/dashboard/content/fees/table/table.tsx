import React from "react";
import { Fee } from "../../../../../lib/types";
import { toUSD } from "../../../../../lib/helpers/to-usd";
import { formatDateTime } from "../../../../../lib/helpers/date-format";

export interface TableProps {
  data: (Fee[] | undefined);
}

export function Table({ data }: TableProps): JSX.Element {
  return (
    <table className="w-full rounded">
      <thead>
        <tr className="text-xxs text-left border-b border-slate-500 border-opacity-40 uppercase">
          <th className="p-4">type</th>
          <th className="p-4">Amout</th>
          <th className="p-4 max-w-[200px]">Date</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((trade) => {
          return (
            <tr className="border-b border-slate-500 border-opacity-40" key={trade.id} id={trade.id}>
              <td className="px-4 py-5">
                <b>
                  {trade.type === 'marginInterest' && 'Margin Interest'}
                  {trade.type === 'subscriptionFee' && 'Subscription Fee'}
                </b>
              </td>
              <td className="px-4 py-5">{toUSD(trade.amount)}</td>
              <td className="px-4 py-5">{formatDateTime(trade.excutionDate)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}