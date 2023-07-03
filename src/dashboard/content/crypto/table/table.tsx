import React, { useState } from "react";
import { Crypto } from "../../../../../lib/types";
import { formatDateTime } from "../../../../../lib/helpers/date-format";
import { toUSD } from "../../../../../lib/helpers/to-usd";
import { TableControl } from "../../components/table-control";

export interface TableProps {
  data: (Crypto[] | undefined);
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
        <table className="w-full rounded border capitalize">
          <thead>
            <tr className="text-xxs text-left border-b uppercase">
              <th className="p-4">Symbol</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Price</th>
              <th className="p-4">Side</th>
              <th className="p-4">Fees</th>
              <th className="p-4">Profit/Loss</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((trade) => {
              return (
                <tr className="border-b" key={trade.id} id={trade.id}>
                  <td className="px-4 py-5"><b>{trade.symbol}</b></td>
                  <td className="px-4 py-5">{Number(trade.quantity).toFixed(8)}</td>
                  <td className="px-4 py-5">{toUSD(trade.price)}</td>
                  <td className="px-4 py-5">{trade.side}</td>
                  <td className="px-4 py-5">{toUSD(trade.fees)}</td>
                  <td className="px-4 py-5">{toUSD(trade.profitOrLoss ?? 0)}</td>
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