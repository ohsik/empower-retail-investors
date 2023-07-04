import React, { useContext } from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData, CryptoWithKey } from '../../../../lib/types';
import { handleContentSelectData } from '../../../../lib/helpers/handle-content-select-data';
import { SelectedDataContext } from '../../context';
import { AllBrokeragesSummary } from '../components/all-brokerages-summary';

type CryptoProps = {
  data: AllData | undefined;
}

export function Crypto({ data }: CryptoProps): JSX.Element {
  const { selectedBrokerage } = useContext(SelectedDataContext);
  const isAllBrokeragesSelected = selectedBrokerage === 'all';
  const dataToRender = handleContentSelectData(data) as CryptoWithKey;

  return (
    <div>
      {isAllBrokeragesSelected && <AllBrokeragesSummary />}
      {
        Object.keys(dataToRender)?.map((dataKey) => {
          // dataKey: robinhood, fidelity, etc.
          return dataToRender[dataKey] && Object.keys(dataToRender[dataKey]).map((timeKey) => {
            // timeKey: all, 2021, 2021+06, etc.
            const key = dataKey+'+'+timeKey;
            const data = dataToRender[dataKey][timeKey as any] as any; // TODO: fix this hack. Moving on for now tho lol

            return (
              <div key={key} id={key} className='shadow-md mb-12 p-6 dark:shadow-neutral-600'>
                <Summary timeKey={timeKey} dataKey={dataKey} data={data} />
                {!isAllBrokeragesSelected && <Table data={data} />}
              </div>
            )
          });
        })
      }
    </div>
  )
}