import React, { useContext } from 'react';

import { Summary } from "../components/summary";
import { Table } from "./table";
import { AllData } from '../../../../lib/types';
import { SelectedDataContext } from '../../context';
import { useLocation } from 'react-router-dom';

type FeesProps = {
  data: AllData | undefined;
};

export function Fees({ data }: FeesProps): JSX.Element {
  const location = useLocation();
  const { selectedBrokerage } = useContext(SelectedDataContext);
  const currentRoute = location.pathname;
  const whichFee = currentRoute.includes('/margin-interest') ? 'marginInterest' : 'subscriptonFees';

  return (
    <div>
      <Summary />
      <Table data={data?.[selectedBrokerage]?.[whichFee]} />
    </div>
  )
}