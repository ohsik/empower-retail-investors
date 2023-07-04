import React, { useContext } from 'react';

import { Summary } from "../components/summary";
import { AllData } from '../../../../lib/types';
import { SelectedDataContext } from '../../context';
import { AllBrokeragesSummary } from '../components/all-brokerages-summary';

type PortfolioProps = {
  data: AllData | undefined;
}

export function Portfolio({ data }: PortfolioProps): JSX.Element {
  const { selectedBrokerage } = useContext(SelectedDataContext);
  const isAllBrokeragesSelected = selectedBrokerage === 'all';
  return (
    <div>
      {isAllBrokeragesSelected && <AllBrokeragesSummary />}
      <h1 className="text-xl font-bold my-4">Portfolio Summary</h1>
      {/* {
        Object.entries(data as AllData).map(( [brokerage, data] ) => {
          return (
            Object.entries(data).map(([key, value]) => {
              if(key !== 'timeSynced') {
                let keyWording = key;

                if(key === 'marginInterest') {
                  keyWording = 'mMargin Interest';
                }

                if(key === 'subscriptionFees') {
                  keyWording = 'Subscription Fees';
                }
                return (
                  <div key={key} className='shadow-md mb-6 p-6 dark:shadow-neutral-800'>
                    <Summary timeKey={brokerage} dataKey={keyWording} data={value} />
                  </div>
                )
              }
            })
          )
        })
      } */}
      
    </div>
  )
}