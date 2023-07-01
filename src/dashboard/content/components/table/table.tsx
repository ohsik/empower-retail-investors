import React from "react";

export function Table(): JSX.Element {
  return (
    <table className="w-full rounded">
      <thead>
        <tr className="text-xxs text-left border-b uppercase">
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
        <tr className="border-b">
          <td className="p-4">APPL</td>
          <td className="p-4">100</td>
          <td className="p-4">$190.22</td>
          <td className="p-4">Buy</td>
          <td className="p-4">$0</td>
          <td className="p-4">Jun 30, 2023</td>
          <td className="p-4">$0</td>
        </tr>
        <tr className="border-b">
          <td className="p-4">APPL</td>
          <td className="p-4">100</td>
          <td className="p-4">$190.22</td>
          <td className="p-4">Buy</td>
          <td className="p-4">$0</td>
          <td className="p-4">Jun 30, 2023</td>
          <td className="p-4">$0</td>
        </tr>
        <tr className="border-b">
          <td className="p-4">APPL</td>
          <td className="p-4">100</td>
          <td className="p-4">$190.22</td>
          <td className="p-4">Buy</td>
          <td className="p-4">$0</td>
          <td className="p-4">Jun 30, 2023</td>
          <td className="p-4">$0</td>
        </tr>
      </tbody>
    </table>
  )
}