import { useContext } from "react";
import { totalSumOfProfitOrLoss } from "../../../../lib/helpers/total-sum-of-profit-or-loss";
import { SelectedDataContext } from "../../context";

/* 
  Must take originalTransformedData
  bacause this function is relys on the original data with i.g. stocks.all
*/

type UsePortfolioReturn = {
  totalsFromTradingTypesObj: Record<string, number>;
  grandTotal: number;
  selectedBrokerage: string;
  selectedTimeDuration: string;
}

export function usePortfolio(): UsePortfolioReturn {
  const { selectedBrokerage, originalTransformedData, selectedTimeDuration } = useContext(SelectedDataContext);

  const selectedOriginalBrokerageData = (originalTransformedData && structuredClone(originalTransformedData[selectedBrokerage])) ?? {};
  
  const totalPLsFromTradingTypes = Object.entries(selectedOriginalBrokerageData).map(([tradingType, dataWithTimeKey]) => {
    const totalPL = totalSumOfProfitOrLoss(dataWithTimeKey.all, tradingType);
    if(totalPL) {
      return { [tradingType]: totalPL }
    }
  });
  
  const totalsFromTradingTypesObj = Object.assign({}, ...totalPLsFromTradingTypes);
  
  const grandTotal = Object.values(totalsFromTradingTypesObj).reduce((total, item) => {
    return (total as number) + (item as number);
  }, 0);

  return {
    totalsFromTradingTypesObj,
    grandTotal: grandTotal as number,
    selectedBrokerage,
    selectedTimeDuration
  }
}
