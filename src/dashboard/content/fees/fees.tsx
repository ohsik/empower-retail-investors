import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData } from '../../../../lib/types';

type FeesProps = {
  data: AllData | undefined;
};

export function Fees({ data }: FeesProps): JSX.Element {
  return (
    <div>
      <Summary />
      <Table data={data?.robinhood.fees} />
    </div>
  )
}