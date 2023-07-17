import React from "react";
import { sidebarMenu } from "../../../../../../lib/consts/sidebar-menu";
import { PriceColored } from "../../../../../../lib/ui/price-colored";

type PortfolioSummaryProps = {
  totalsFromTradingTypesObj: Record<string, number | undefined>;
  grandTotal: number;
  isAllBrokerages?: boolean;
  brokerage?: string;
}

export function PortfolioSummary({ totalsFromTradingTypesObj, grandTotal, isAllBrokerages, brokerage }: PortfolioSummaryProps): JSX.Element {
  return (
    <>
      <div className='shadow-md mb-12 p-6 dark:shadow-neutral-800'>
        <div className="grid grid-cols-[4fr,8fr] gap-1 w-full rounded border shadow-sm capitalize dark:border-zinc-700">
          <div className="p-8 border-gray-300">
            <h2 className="text-xs capitalize mb-1">
              Data from
            </h2>

            {brokerage && <p className="text-xl font-semibold my-1 text-primary">{brokerage}</p>}

            {isAllBrokerages && <p className={`text-xl font-semibold my-1`}><span className="text-primary">Grand Total Profit/Loss from<br />All Brokerages<br /></span> All Time Summary</p>}

            <p className="text-xs opacity-50 italic normal-case mt-4">
              (To view more details, choose a trading type or modify the time duration selection.)
            </p>
          </div>
          <div className="p-8">
            <h2 className="text-xs capitalize mb-1">Total Profit/Loss</h2>
            <p className={`text-2xl font-bold`}>
              <PriceColored price={grandTotal} />
            </p>

            <ul className="text-sm mt-6">
              {
                Object.entries(totalsFromTradingTypesObj).map(([tradingType, totalPL]) => {
                  const tradingTypeName = sidebarMenu.find((item) => item.key === tradingType)?.name;

                  return (
                    <li key={tradingType} className='p-2 border-t grid grid-cols-[1fr,auto] justify-between dark:border-zinc-800'>
                      <span>{tradingTypeName}:</span>
                      <span className={`font-semibold`}>
                        <PriceColored price={totalPL as number} />
                      </span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
