import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "../components/table";

type DividendsProps = {
};

export function Dividends({}: DividendsProps): JSX.Element {
  return (
    <div>
      <Summary />
      <Table data={undefined} />
    </div>
  )
}