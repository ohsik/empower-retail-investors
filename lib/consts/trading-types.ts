import { Data } from "../types";

export const AllTransactionHistoryTypes: (keyof Data)[] = [ `stocks`, `options`, `crypto`, `dividends`, `marginInterest`, `subscriptionFees`];

export const tradingTypes = [`stocks`, `options`, `crypto`] as const;

export const nonTradingTypes = [`dividends`, `marginInterest`, `subscriptionFees`] as const;