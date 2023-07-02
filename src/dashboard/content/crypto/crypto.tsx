import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData, Crypto as CryptoType } from '../../../../lib/types';
import { handleContentSelectData } from '../../../../lib/helpers/handle-content-select-data';

type CryptoProps = {
  data: AllData | undefined;
}

export function Crypto({ data }: CryptoProps): JSX.Element {
  const dataToRender = handleContentSelectData(data);

  return (
    <div>
      {dataToRender?.isMutipleBrokerages ?
        (
          (dataToRender?.selectedData as CryptoType[])?.map((data, index) => {
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
            <Table data={dataToRender?.selectedData as CryptoType[]} />
          </div>
        )
      }
    </div>
  )
}