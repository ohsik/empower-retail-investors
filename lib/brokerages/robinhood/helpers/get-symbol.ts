interface GetStockSymbolReturn {
  symbol: string;
  name: string;
};

interface GetStockSymbolType {
  [instrument: string]: GetStockSymbolReturn;
};

let allSymbols: GetStockSymbolType = {};

export async function getSymbols(instrument: string): Promise<GetStockSymbolReturn> {
  
  if (!allSymbols[instrument]) {
    const response = await fetch(instrument);
    const data = await response.json();

    const symbolData: GetStockSymbolReturn = {
      symbol: data.symbol,
      name: data.name,
    };

    allSymbols[instrument] = symbolData;
  }

  return allSymbols[instrument];
}
