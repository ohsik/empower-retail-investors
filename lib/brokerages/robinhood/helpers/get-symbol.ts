interface GetStockSymbolReturn {
  [instrument: string]: {
    symbol: string;
    name: string;
  }
}

export async function getSymbol(instrument: string): Promise<GetStockSymbolReturn> {
  
  // Make map of all symbols and names

  const response = await fetch(instrument);
  const data = await response.json();

  return {
    [instrument]: {
      symbol: data.symbol,
      name: data.name
    }
  };
}