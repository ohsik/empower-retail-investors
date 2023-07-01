import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "../components/table";

type CryptoProps = {
}

export function Crypto({}: CryptoProps): JSX.Element {
  return (
    <div>
      <Summary />
      <Table data={undefined} />
    </div>
  )
}