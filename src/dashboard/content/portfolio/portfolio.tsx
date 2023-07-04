import React, { useContext } from 'react';

import { Summary } from "../components/summary";
import { AllData } from '../../../../lib/types';
import { SelectedDataContext } from '../../context';

type PortfolioProps = {
  data: AllData | undefined;
}

export function Portfolio({ data }: PortfolioProps): JSX.Element {
  const { selectedBrokerage } = useContext(SelectedDataContext);
  
  return (
    <div>
      <h1 className="text-xl font-bold my-4">Portfolio Summary</h1>
      {
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
                  <div key={key} className='shadow-md mb-6 p-6 dark:shadow-neutral-600'>
                    <Summary timeKey={brokerage} dataKey={keyWording} data={value} />
                  </div>
                )
              }
            })
          )
        })
      }
      
    </div>
  )
}