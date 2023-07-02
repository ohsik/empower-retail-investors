import React, { useContext } from 'react';

import { Summary } from "../components/summary";
import { SelectedDataContext } from '../../context';
import { AllData } from '../../../../lib/types';

type PortfolioProps = {
  data: AllData | undefined;
}

export function Portfolio({ data }: PortfolioProps): JSX.Element {
  const { selectedBrokerage } = useContext(SelectedDataContext);
  
  return (
    <div>
      <Summary />
      {selectedBrokerage}
    </div>
  )
}