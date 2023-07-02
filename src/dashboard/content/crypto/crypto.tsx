import React, { useContext } from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData } from '../../../../lib/types';
import { SelectedDataContext } from '../../context';

type CryptoProps = {
  data: AllData | undefined;
}

export function Crypto({ data }: CryptoProps): JSX.Element {
  const { selectedBrokerage } = useContext(SelectedDataContext);

  return (
    <div>
      <Summary />
      <Table data={data?.[selectedBrokerage]?.crypto} />
    </div>
  )
}