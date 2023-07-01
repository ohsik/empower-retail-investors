import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "../components/table";

type FeesProps = {
};

export function Fees({}: FeesProps): JSX.Element {
  return (
    <div>
      <Summary />
      <Table data={undefined} />
    </div>
  )
}