import { useContext } from "react";
import { SelectedDataContext } from "../../../../context";
import { totalSumOfProfitOrLoss } from "../../../../../../lib/helpers/total-sum-of-profit-or-loss";

/* 
  Must take originalTransformedData
  bacause this function is relys on the original data with i.g. stocks.all
*/

interface TotalByTradeType {
  stocks: number;
  options: number;
  crypto: number;
  dividends: number;
  marginInterest: number;
  subscriptionFees: number;
}

interface BrokerageData {
  totalByTradeType: TotalByTradeType;
  grandTotal: number;
}

type CalculateTotalSummaryProps = {
  totalsPerBrokerageObj: Record<string, BrokerageData>;
};

type UseAllBrokeragesReturn = {
  totalsPerBrokerageObj: Record<string, BrokerageData>;
  grandTotalSummaryOfAll: BrokerageData;
};

export function useAllBrokerages(): UseAllBrokeragesReturn {
  const { originalTransformedData } = useContext(SelectedDataContext);
  const selectedOriginalData = (originalTransformedData && structuredClone(originalTransformedData)) ?? {};

  const perBrokerage = Object.entries(selectedOriginalData).map(([brokerage, dataWithTimeKey]) => {
    const perTradeType = Object.entries(dataWithTimeKey).map(([tradingType, dataWithTimeKey]) => {
      const results = totalSumOfProfitOrLoss(dataWithTimeKey.all, tradingType);
      const totalPL = results?.totalPL;

      if (totalPL) {
        return { [tradingType]: totalPL };
      }
    });

    const perTradeTypeObj = Object.assign({}, ...perTradeType);

    const totalPerBrokerage = Object.values(perTradeTypeObj).reduce((total, item) => {
      return (total as number) + (item as number);
    }, 0);

    return {
      [brokerage]: {
        totalByTradeType: perTradeTypeObj,
        grandTotal: totalPerBrokerage,
      },
    };
  });

  const totalsPerBrokerageObj = Object.assign({}, ...perBrokerage);
  const grandTotalSummaryOfAll = calculateTotalSummary({ totalsPerBrokerageObj });

  return {
    totalsPerBrokerageObj,
    grandTotalSummaryOfAll,
  };
}

function calculateTotalSummary({ totalsPerBrokerageObj }: CalculateTotalSummaryProps): BrokerageData {
  return Object.values(totalsPerBrokerageObj).reduce((summary, brokerage) => {
    const totalByTradeType = brokerage.totalByTradeType;
    summary.totalByTradeType.stocks += totalByTradeType.stocks;
    summary.totalByTradeType.options += totalByTradeType.options;
    summary.totalByTradeType.crypto += totalByTradeType.crypto;
    summary.totalByTradeType.dividends += totalByTradeType.dividends;
    summary.totalByTradeType.marginInterest += totalByTradeType.marginInterest;
    summary.totalByTradeType.subscriptionFees += totalByTradeType.subscriptionFees;
    summary.grandTotal += brokerage.grandTotal;
    return summary;
  }, {
    totalByTradeType: {
      stocks: 0,
      options: 0,
      crypto: 0,
      dividends: 0,
      marginInterest: 0,
      subscriptionFees: 0,
    },
    grandTotal: 0,
  });
}
