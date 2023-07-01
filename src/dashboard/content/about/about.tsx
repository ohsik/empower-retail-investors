import React from 'react';

import { Header } from "../components/header";
import { Summary } from "../components/summary";
import { Table } from "../components/table";

type AboutProps = {
  title: string;
};

export function About({ title }: AboutProps): JSX.Element {
  return (
    <div className="p-10">
      <Header title={title} />
      <Summary />
      <Table />
    </div>
  )
}