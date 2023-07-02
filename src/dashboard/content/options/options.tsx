import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData } from '../../../../lib/types';

type OptionsProps = {
  data: AllData | undefined;
}

export function Options({ data }: OptionsProps): JSX.Element {
  return (
    <div>
      <Summary />
      <Table data={data?.robinhood.options} />
    </div>
  )
}