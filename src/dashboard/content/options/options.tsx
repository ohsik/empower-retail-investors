import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "../components/table";

type OptionsProps = {
}

export function Options({}: OptionsProps): JSX.Element {
  return (
    <div>
      <Summary />
      <Table data={undefined} />
    </div>
  )
}