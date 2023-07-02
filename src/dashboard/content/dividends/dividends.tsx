import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData } from '../../../../lib/types';

type DividendsProps = {
  data: AllData | undefined;
};

export function Dividends({ data }: DividendsProps): JSX.Element {
  return (
    <div>
      <Summary />
      <Table data={data?.robinhood.dividends} />
    </div>
  )
}