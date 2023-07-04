import React from "react";
import { useAllBrokerages } from "./use-all-brokerages";
import { PortfolioSummary } from "../portfolio-summary";

export function AllBroderages(): JSX.Element {
  const { totalsPerBrokerageObj, grandTotalSummaryOfAll } = useAllBrokerages();

  return (
    <div className="my-10">
      {/* Showing summary of all brokerages */}
      <PortfolioSummary isAllBrokerages totalsFromTradingTypesObj={grandTotalSummaryOfAll.totalByTradeType as any} grandTotal={grandTotalSummaryOfAll.grandTotal} />

      {/* Show summary of each brokerage */}
      {
        totalsPerBrokerageObj && Object.entries(totalsPerBrokerageObj).map(([brokerage, data]) => {
          return <PortfolioSummary key={brokerage} brokerage={brokerage} totalsFromTradingTypesObj={data.totalByTradeType as any} grandTotal={data.grandTotal} />
        })
      }
    </div>
  )
}