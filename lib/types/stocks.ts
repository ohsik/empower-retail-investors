export interface Stock {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  amount: number; // price * quantity
  fees: number;
  side: 'buy' | 'sell';
  executionDate: string;
  instrument_id?: string;
  profitOrLoss?: number;
  optionEvent?: optionEvent;
  corpEvent?: CorpAction;
}

interface optionEvent {
  type: string;
  value?: string;
}

export interface CorpAction {
  direction: string;
  divisor: number;
  effective_date: string;
  multiplier: number;
  new_instrument_id: string;
  old_instrument_id: string;
}

export interface StocksWithKey {
  [key: string]: Stock[]
}