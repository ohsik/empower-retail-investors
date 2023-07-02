import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData, Dividend } from '../../../../lib/types';
import { handleContentSelectData } from '../../../../lib/helpers/handle-content-select-data';

type DividendsProps = {
  data: AllData | undefined;
};

export function Dividends({ data }: DividendsProps): JSX.Element {
  const dataToRender = handleContentSelectData(data);

  return (
    <div>
      {dataToRender?.isMutipleBrokerages ?
        (
          (dataToRender?.selectedData as Dividend[])?.map((data, index) => {
            const brockerageKey = Object.keys(data)[index];
            const selectedData = Object.values(data)[index];

            return (
              <div key={brockerageKey} id={brockerageKey}>
                <Summary brokerage={brockerageKey} />
                <Table data={selectedData} />
              </div>
            )
          })
        ) 
      :
        (
          <div>
            <Summary />
            <Table data={dataToRender?.selectedData as Dividend[]} />
          </div>
        )
      }
    </div>
  )
}