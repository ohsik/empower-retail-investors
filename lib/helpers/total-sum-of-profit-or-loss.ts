import { useLocation } from "react-router-dom";
import { sidebarMenu } from "../consts/sidebar-menu";
import { Data } from "../types";
import { tradingTypes } from "../consts/trading-types";

// TODO: fix any type
export function totalSumOfProfitOrLoss(data: any, tradingType?: string): number | undefined {

  const location = useLocation();
  const currentRoute = location.pathname;
  const dataKeyFromURL = sidebarMenu.find((item) => item.url === currentRoute)?.key as keyof Data;

  const dataKey = tradingType ?? dataKeyFromURL
  const isValidDataKey = tradingTypes.includes(dataKey as any);

  if(isValidDataKey) {
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

  return
}