import React, { useState } from "react";
import { Dividend } from "../../../../../lib/types";
import { toUSD } from "../../../../../lib/helpers/to-usd";
import { formatDateTime } from "../../../../../lib/helpers/date-format";
import { TableControl } from "../../components/table-control";

export interface TableProps {
  data: (Dividend[] | undefined);
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
              <th className="p-4">Position</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((trade) => {
              return (
                <tr className="border-b" key={trade.id} id={trade.id}>
                  <td className="px-4 py-5"><b>{trade.symbol}</b></td>
                  <td className="px-4 py-5">{Number(trade.position).toFixed(2)}</td>
                  <td className="px-4 py-5">{toUSD(trade.amount)}</td>
                  <td className="px-4 py-5">{formatDateTime(trade.excutionDate)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </div>
  )
}