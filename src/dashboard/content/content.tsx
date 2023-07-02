import React from "react";
import { Route, Routes } from 'react-router-dom';

import { Stocks } from "./stocks";
import { Portfolio } from "./portfolio";
import { Options } from "./options";
import { Crypto } from "./crypto";
import { Dividends } from "./dividends";
import { Fees } from "./fees";
import { About } from "./about";
import { AllData } from "../../../lib/types";

type ContentProps = {
  data: AllData | undefined;
}

export function Content({ data }: ContentProps): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Portfolio data={data} />} />
      <Route path="/stocks" element={<Stocks data={data} />} />
      <Route path="/options" element={<Options data={data} />} />
      <Route path="/crypto" element={<Crypto data={data} />} />
      <Route path="/dividends" element={<Dividends data={data} />} />
      <Route path="/subscription-fees" element={<Fees data={data} />} />
      <Route path="/margin-interest" element={<Fees data={data} />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}