import React from 'react';

import { Header } from "../components/header";
import { Summary } from "../components/summary";
import { Table } from "../components/table";

type CryptoProps = {
  title: string;
}

export function Crypto({ title }: CryptoProps): JSX.Element {
  return (
    <div className="p-10">
      <Header title={title} />
      <Summary />
      <Table />
    </div>
  )
}