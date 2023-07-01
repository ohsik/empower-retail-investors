import React, { useContext } from 'react';

import { Summary } from "../components/summary";
import { SelectedDataContext } from '../../context';

type PortfolioProps = {
}

export function Portfolio({}: PortfolioProps): JSX.Element {
  const { selectedBrokerage } = useContext(SelectedDataContext);
  
  return (
    <div>
      <Summary />
      {selectedBrokerage}
    </div>
  )
}