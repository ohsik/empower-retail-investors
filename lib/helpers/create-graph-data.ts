import { Data } from "../types";
import { totalSumOfProfitOrLoss } from "./total-sum-of-profit-or-loss";

export function createGraphData(data: Data): any {
  const graphData: any = {};

  if (data) {
    const filteredData = Object.fromEntries(Object.entries(data).filter(([timeKey, _data]) => timeKey !== 'timeSynced'));

    for (const [tradingTypeKey, dataWithTimeKey] of Object.entries(filteredData)) {
      const tradingTypeData = [];

      for (const [timeKey, dataArray] of Object.entries(dataWithTimeKey)) {
        const results = totalSumOfProfitOrLoss(dataArray, tradingTypeKey);
        const totalPL = results?.totalPL;

        if(totalPL !== 0) {
          tradingTypeData.push({
            date: timeKey.trim(),
            value: totalPL,
            tooltipContent: `<b>Duration: </b> ${timeKey.trim()}<br /><b>P/L: </b> ${totalPL}`, // not being used yet on line graph
          });
        }
      }

      graphData[tradingTypeKey] = tradingTypeData;
    }
  }

  return graphData;
}

