import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData, Option } from '../../../../lib/types';
import { handleContentSelectData } from '../../../../lib/helpers/handle-content-select-data';

type OptionsProps = {
  data: AllData | undefined;
}

export function Options({ data }: OptionsProps): JSX.Element {
  const dataToRender = handleContentSelectData(data);

  return (
    <div>
      {dataToRender?.isMutipleBrokerages ?
        (
          (dataToRender?.selectedData as Option[])?.map((data, index) => {
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
            <Table data={dataToRender?.selectedData as Option[]} />
          </div>
        )
      }
    </div>
  )
}