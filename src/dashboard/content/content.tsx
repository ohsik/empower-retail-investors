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
  console.log("content.tsx:", data)

  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/stocks" element={<Stocks data={data} />} />
      <Route path="/options" element={<Options />} />
      <Route path="/crypto" element={<Crypto />} />
      <Route path="/dividends" element={<Dividends />} />
      <Route path="/subscription-fees" element={<Fees />} />
      <Route path="/margin-interest" element={<Fees />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}