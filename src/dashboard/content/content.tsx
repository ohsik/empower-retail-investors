import React from "react";

export function Content({ data }: { data: any }): JSX.Element {
  return (
    <div className="p-10">
      <h1>fetchedData</h1>
      <span className="whitespace-nowrap">
        {data && data['fetchedData-robinhood'].timeSynced}
      </span>
    </div>
  )
}