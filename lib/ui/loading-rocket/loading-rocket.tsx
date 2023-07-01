import React from "react";

export function RocketLoading (): JSX.Element {
  return (
    <div className="grid items-center justify-center h-full">
      <span role="img" aria-label="Rocket" className="text-5xl animate-spin">
        🚀
      </span>
    </div>
  )
};
