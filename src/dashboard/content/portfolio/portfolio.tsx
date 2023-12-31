import React from 'react';

import { AllData } from '../../../../lib/types';
import { AllBrokeragesWarning } from '../components/all-brokerages-warning';
import { AllBrokerages } from './components/all-brokerages';
import { PortfolioSummary } from './components/portfolio-summary';
import { createGraphData } from '../../../../lib/helpers/create-graph-data';
import { Graph } from './components/graph';
import { usePortfolio } from './usePortfolio';

type PortfolioProps = {
  data: AllData | undefined;
}

export function Portfolio({ data }: PortfolioProps): JSX.Element {
  const { totalsFromTradingTypesObj, grandTotal, selectedTimeDuration, selectedBrokerage } = usePortfolio();
  const isAllBrokeragesSelected = selectedBrokerage === 'all';

  const selectedBrokerageData = (data && data[selectedBrokerage]) ?? {};
  const graphData = createGraphData(selectedBrokerageData);

  return (
    <div>
      {/* All brokerages summary */}
      {isAllBrokeragesSelected && 
        <>
          <AllBrokeragesWarning />
          <AllBrokerages />
        </>
      }

      {/* A brokerages summary */}
      {!isAllBrokeragesSelected && 
        <>
          <PortfolioSummary totalsFromTradingTypesObj={totalsFromTradingTypesObj} grandTotal={grandTotal} brokerage={selectedBrokerage} />

          {
            selectedTimeDuration !== 'all' ? 
              <div className="text-xl my-1">
                {
                  Object.entries(graphData).map(([section, graphData]) => {
                    if((graphData as any).length === 0) return (
                      <div key={section} className='grid justify-center items-center h-[200px] text-xs border dark:border-zinc-700 rounded mb-8'>
                        🤷‍♀️ Sorry, no P/L trades yet to generate {section} graphs.
                      </div>
                    );

                    return (
                      <Graph key={section} graphData={graphData as any} section={section} />
                    )
                  })
                }
              </div>
            : 
              <div className='grid justify-center items-center h-[200px] opacity-50 text-xs'>
                To visualize the trading performance graph, select a different time frame from the available options.
              </div>
          }
        </>
      }
    </div>
  )
}