import React, { useState } from "react";
import { Option } from "../../../../../lib/types";
import { toUSD } from "../../../../../lib/helpers/to-usd";
import { formatDate, formatDateTime } from "../../../../../lib/helpers/date-format";
import { SlashDivider } from "../../../../../lib/ui/slash-divider";
import { TableControl } from "../../components/table-control";

export interface TableProps {
  data: Option[] | undefined;
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
              <th className="p-4">Direction</th>
              <th className="p-4">Fees</th>
              <th className="p-4">Profit/Loss</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((trade) => {
              return (
                <tr className="border-b" key={trade.id} id={trade.id}>
                  <td className="px-4 py-5">
                    {
                      trade.legs.map((leg, index) => {
                        return (
                          <p key={index}>
                            <b>{trade.symbol}</b> <span className="text-xs"><SlashDivider /> {toUSD(leg.strikePrice)} {leg.optionType} {formatDate(leg.expirationDate)} <SlashDivider /> {leg.side} to {leg.positionEffect}</span>
                          </p>
                        )
                      })
                    }
                  </td>
                  <td className="px-4 py-5">{Number(trade.quantity).toFixed(2)}</td>
                  <td className="px-4 py-5">{toUSD(trade.price)}</td>
                  <td className="px-4 py-5">{trade.direction}</td>
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