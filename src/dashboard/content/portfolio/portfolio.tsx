import React from 'react';

import { Header } from "../components/header";
import { Summary } from "../components/summary";
import { Table } from "../components/table";

type PortfolioProps = {
  title: string;
}

export function Portfolio({ title }: PortfolioProps): JSX.Element {
  return (
    <div className="p-10">
      <Header title={title} />
      <Summary />
    </div>
  )
}