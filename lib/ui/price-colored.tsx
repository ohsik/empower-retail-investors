import React from "react";
import { toUSD } from "../helpers/to-usd";

type PriceColoredProps = {
  price: number;
}

export function PriceColored({ price }: PriceColoredProps ): JSX.Element {
  return <span className={`${price && (price === 0 ? `text-[inherit]` : (price > 0 ? `text-[#22c55d]` : `text-[#ef4444]`))}`}>{toUSD(price)}</span>;
}