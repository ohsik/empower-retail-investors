import React, { useContext } from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData, StocksWithKey } from '../../../../lib/types';
import { handleContentSelectData } from '../../../../lib/helpers/handle-content-select-data';
import { SelectedDataContext } from '../../context';
import { Link } from 'react-router-dom';

type StocksProps = {
  data: AllData | undefined;
}

export function Stocks({ data }: StocksProps): JSX.Element {
  const { selectedBrokerage } = useContext(SelectedDataContext);
  const isAllBrokeragesSelected = selectedBrokerage === 'all';
  const dataToRender = handleContentSelectData(data) as StocksWithKey;

  return (
    <div>
      {isAllBrokeragesSelected &&
        <div className='shadow-md mb-12 p-6'>
          📣 We need help to brings more brokerages into Empower Retail Investors. Please checkout <Link to={`/about`} className='underline text-primary'>About page</Link> for more info.
        </div>
      }
      {
        Object.keys(dataToRender)?.map((dataKey) => {
          // dataKey: robinhood, fidelity, etc.
          return dataToRender[dataKey] && Object.keys(dataToRender[dataKey]).map((timeKey) => {
            // timeKey: all, 2021, 2021+06, etc.
            const key = dataKey+'-'+timeKey;
            const data = dataToRender[dataKey][timeKey as any] as any; // TODO: fix this hack. Moving on for now tho lol

            return (
              <div key={key} id={key} className='shadow-md mb-12 p-6'>
                <Summary timeKey={timeKey} dataKey={dataKey} data={data} />
                <Table data={data} />
              </div>
            )
          });
        })
      }
    </div>
  )
}