import React, { useContext } from "react"
import { LineGraph } from "./graphs";
import { SelectedDataContext } from "../../../../context";

export type GraphData = {
  date: string
  value: number
  tooltipContent: string
}

type GraphProps = {
  section: string
  graphData: GraphData[]
}

export function Graph({ section, graphData }: GraphProps): JSX.Element {
  const { selectedTimeDuration } = useContext(SelectedDataContext);

  return (
    <>
      {/* reversedGraphData is added cause d3 svg dynamic width and height work funky with handling graphData.reverse() */}
      <LineGraph graphData={graphData} reversedGraphData={graphData.reverse()} section={section} durationSelected={selectedTimeDuration} />
    </>
  );
}