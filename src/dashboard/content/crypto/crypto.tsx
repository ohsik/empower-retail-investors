import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData } from '../../../../lib/types';

type CryptoProps = {
  data: AllData | undefined;
}

export function Crypto({ data }: CryptoProps): JSX.Element {
  return (
    <div>
      <Summary />
      <Table data={data?.robinhood.crypto} />
    </div>
  )
}