import React, { useContext } from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData, FeesWithKey } from '../../../../lib/types';
import { handleContentSelectData } from '../../../../lib/helpers/handle-content-select-data';
import { SelectedDataContext } from '../../context';
import { AllBrokeragesWarning } from '../components/all-brokerages-warning';
import { NoTrades } from '../components/no-trades';

type FeesProps = {
  data: AllData | undefined;
};

export function Fees({ data }: FeesProps): JSX.Element {
  const { selectedBrokerage } = useContext(SelectedDataContext);
  const isAllBrokeragesSelected = selectedBrokerage === 'all';
  const dataToRender = handleContentSelectData(data) as FeesWithKey;
  
  return (
    <div>
      {isAllBrokeragesSelected && <AllBrokeragesWarning />}

      {
        Object.keys(dataToRender)?.map((dataKey) => {
          // dataKey: robinhood, fidelity, etc.
          
          if(dataToRender[dataKey]) {
            return Object.keys(dataToRender[dataKey]).map((timeKey) => {
              // timeKey: all, 2021, 2021+06, etc.
              const key = dataKey+'+'+timeKey;
              const data = dataToRender[dataKey][timeKey as any] as any; // TODO: fix this hack. Moving on for now tho lol

              return (
                <div key={key} id={key} className='shadow-md mb-12 p-6 dark:shadow-neutral-800'>
                  <Summary timeKey={timeKey} dataKey={dataKey} data={data} />
                  <Table data={data} />
                </div>
              )
            });
          } 
          
          if(!dataToRender[dataKey]) {
            return (
              <div key={dataKey} id={dataKey} className='shadow-md mb-12 p-6 dark:shadow-neutral-800'>
                <NoTrades />
              </div>
            )
          }
        })
      }
    </div>
  )
}