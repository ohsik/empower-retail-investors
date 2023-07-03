import React, { useContext } from 'react';

import { Summary } from "../components/summary";
import { AllData, Data } from '../../../../lib/types';
import { SelectedDataContext } from '../../context';

type PortfolioProps = {
  data: AllData | undefined;
}

export function Portfolio({ data }: PortfolioProps): JSX.Element {
  const { selectedBrokerage } = useContext(SelectedDataContext);
  
  return (
    <div>
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

                return <Summary key={`${brokerage}-${key}`} brokerage={selectedBrokerage === 'all' ? `All brokerages - ${keyWording}` : keyWording} data={value as Data} />
              }
            })
          )
        })
      }
      
    </div>
  )
}