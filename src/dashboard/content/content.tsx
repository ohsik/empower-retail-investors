import React from "react";
import { Route, Routes } from 'react-router-dom';

import { Stocks } from "./stocks";
import { Portfolio } from "./portfolio";
import { Options } from "./options";
import { Crypto } from "./crypto";
import { Dividends } from "./dividends";
import { Fees } from "./fees";
import { About } from "./about";
import { sidebarManu } from "../sidebar/sidebar";

export function Content({ data }: { data: any }): JSX.Element {
  console.log("content.tsx:", data)

  function getRouteTitle(route: string): string {
    return sidebarManu.filter((item) => item.key === route)[0].name
  }

  return (
    <Routes>
      <Route path="/" element={<Portfolio title={getRouteTitle('portfolio')} />} />
      <Route path="/stocks" element={<Stocks title={getRouteTitle('stocks')} />} />
      <Route path="/options" element={<Options title={getRouteTitle('options')} />} />
      <Route path="/crypto" element={<Crypto title={getRouteTitle('crypto')} />} />
      <Route path="/dividends" element={<Dividends title={getRouteTitle('dividends')} />} />
      <Route path="/subscription-fees" element={<Fees title={getRouteTitle('subscriptionFees')} />} />
      <Route path="/margin-interest" element={<Fees title={getRouteTitle('marginInterest')} />} />
      <Route path="/about" element={<About title={getRouteTitle('about')} />} />
    </Routes>
  )
}