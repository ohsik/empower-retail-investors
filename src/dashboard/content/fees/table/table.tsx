import React, { useState } from "react";
import { Fee } from "../../../../../lib/types";
import { toUSD } from "../../../../../lib/helpers/to-usd";
import { formatDateTime } from "../../../../../lib/helpers/date-format";
import { TableControl } from "../../components/table-control";

export interface TableProps {
  data: (Fee[] | undefined);
}

export function Table({ data }: TableProps): JSX.Element {
  const [showTable, setShowTable] = useState(true);

  function showHide() {
    setShowTable(!showTable);
  }

  function downloadCVS() {
    alert('Download CVS file is coming soon. Stay tuned 🙌');
  }

  return (
    <div>
      <TableControl showHide={showHide} downloadCVS={downloadCVS} showTable={showTable} />
      {showTable && 
        <table className="w-full rounded border capitalize text-xs dark:border-zinc-800">
          <thead>
            <tr className="text-xxs text-left border-b uppercase dark:border-zinc-800">
              <th className="p-4 py-2">type</th>
              <th className="p-4 py-2">Amout</th>
              <th className="p-4 py-2 max-w-[200px]">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((trade) => {
              return (
                <tr className="border-b dark:border-zinc-800" key={trade.id} id={trade.id}>
                  <td className="px-4 py-5">
                    <b>
                      {trade.type === 'marginInterest' && 'Margin Interest'}
                      {trade.type === 'subscriptionFee' && 'Subscription Fee'}
                    </b>
                  </td>
                  <td className="px-4 py-5">{toUSD(trade.amount)}</td>
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