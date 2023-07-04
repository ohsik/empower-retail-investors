import { useLocation } from "react-router-dom";
import { sidebarMenu } from "../consts/sidebar-menu";
import { Data } from "../types";

// TODO: fix any type
export function totalSumOfProfitOrLoss(data: any): number {
  const location = useLocation();
  const currentRoute = location.pathname;
  const dataKey = sidebarMenu.find((item) => item.url === currentRoute)?.key as keyof Data;

  // TODO: fix this for the portfoio page
  // console.log('dataKey', dataKey, data)

  if(dataKey === 'portfolio') {
    return 0
  }

  if(dataKey === 'stocks' || dataKey ==='options' || dataKey ==='crypto') {
    const totalPL = data.reduce((acc: any, item: any) => {
      return acc + item.profitOrLoss;
    }, 0);

    return totalPL
  }

  // dividends and fees calculation
  const sum = data.reduce((acc: any, item: any) => {
    return acc + item.amount;
  }, 0);

  return sum
}