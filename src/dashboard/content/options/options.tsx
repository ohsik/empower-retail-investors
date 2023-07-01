import React from 'react';

import { Header } from "../components/header";
import { Summary } from "../components/summary";
import { Table } from "../components/table";

type OptionsProps = {
  title: string;
}

export function Options({ title }: OptionsProps): JSX.Element {
  return (
    <div className="p-10">
      <Header title={title} />
      <Summary />
      <Table />
    </div>
  )
}