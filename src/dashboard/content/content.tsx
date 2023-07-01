import React from "react";

export function Content({ data }: { data: any }): JSX.Element {
  console.log("content.tsx", data)
  return (
    <div className="p-10">
      <h1>fetchedData</h1>
      <span className="whitespace-nowrap">
        coming soon
      </span>
    </div>
  )
}