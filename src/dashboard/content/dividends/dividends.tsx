import React, { useContext } from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData } from '../../../../lib/types';
import { SelectedDataContext } from '../../context';

type DividendsProps = {
  data: AllData | undefined;
};

export function Dividends({ data }: DividendsProps): JSX.Element {
  const { selectedBrokerage } = useContext(SelectedDataContext);

  return (
    <div>
      <Summary />
      <Table data={data?.[selectedBrokerage]?.dividends} />
    </div>
  )
}