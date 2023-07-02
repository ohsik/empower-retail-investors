import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData } from '../../../../lib/types';

type StocksProps = {
  data: AllData | undefined;
}

export function Stocks({ data }: StocksProps): JSX.Element {
  return (
    <div>
      <Summary />
      <Table data={data?.robinhood.stocks} />
    </div>
  )
}