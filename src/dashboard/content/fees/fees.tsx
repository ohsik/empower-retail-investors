import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData, Fee } from '../../../../lib/types';
import { handleContentSelectData } from '../../../../lib/helpers/handle-content-select-data';

type FeesProps = {
  data: AllData | undefined;
};

export function Fees({ data }: FeesProps): JSX.Element {
  const dataToRender = handleContentSelectData(data);
  
  return (
    <div>
      {dataToRender?.isMutipleBrokerages ?
        (
          (dataToRender?.selectedData as Fee[])?.map((data, index) => {
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
            <Table data={dataToRender?.selectedData as Fee[]} />
          </div>
        )
      }
    </div>
  )
}