import { useLocation } from "react-router-dom";
import { sidebarMenu } from "../consts/sidebar-menu";
import { Data } from "../types";
import { AllTransactionHistoryTypes, tradingTypes } from "../consts/trading-types";

type TradingTypeReturns = {
  isTradeData: boolean;
  totalPL: number;
  wins?: number;
  losses?: number;
  totalWinAmount?: number;
  totalLossAmount?: number;
  winningPercentage?: number;
}

// TODO: fix any type
export function totalSumOfProfitOrLoss(data: any, tradingType?: string): TradingTypeReturns | undefined {

  const location = useLocation();
  const currentRoute = location.pathname;
  const dataKeyFromURL = sidebarMenu.find((item) => item.url === currentRoute)?.key as keyof Data;

  const dataKey = tradingType ?? dataKeyFromURL
  const isValidDataKey = AllTransactionHistoryTypes.includes(dataKey as any);
  const isDataTrades = tradingTypes.includes(dataKey as any);

  let totalPL = 0;
  let wins = 0;
  let losses = 0;
  let totalWinAmount = 0;
  let totalLossAmount = 0;

  if(isValidDataKey) {
    if(isDataTrades) {
      data.forEach((item: any) => {
        if(item.profitOrLoss > 0) {
          wins++
          totalWinAmount += item.profitOrLoss
        }
    
        if(item.profitOrLoss < 0) {
          losses++
          totalLossAmount += item.profitOrLoss
        }

        totalPL += item.profitOrLoss
      });

      return {
        isTradeData: true,
        totalPL,
        wins,
        losses,
        totalWinAmount,
        totalLossAmount,
        winningPercentage: calculateWinningPercentage(wins, losses),
      }
    }
  
    // dividends and fees calculation
    const sum = data.reduce((acc: any, item: any) => {
      return acc + item.amount;
    }, 0);
  
    return {
      isTradeData: false,
      totalPL: sum,
    }
  }

  return undefined
}

// TODO: implement below

export function calculateWinningPercentage(wins: number, losses: number): number {
  if (wins === 0 && losses === 0) {
    return 0;
  }

  const totalGames = wins + losses;
  const percentage = (wins / totalGames) * 100;

  return parseInt(percentage.toFixed(2), 10);
}