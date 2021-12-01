export interface Login {
  access_token: string;
  refresh_token: string;
}
export interface RefreshToken {
  access_token: string;
}

export interface Pong {
  status: string;
}

export interface Whitelist {
  whitelist: string[];
  length: number;
  method: string[];
}

export interface Blacklist {
  blacklist: string[];
  blacklist_expanded: string[];
  errors: Errors;
  length: number;
  method: string[];
}

export interface Profit {
  profit_closed_coin: number;
  profit_closed_percent_mean: number;
  profit_closed_ratio_mean: number;
  profit_closed_percent_sum: number;
  profit_closed_ratio_sum: number;
  profit_closed_percent: number;
  profit_closed_ratio: number;
  profit_closed_fiat: number;
  profit_all_coin: number;
  profit_all_percent_mean: number;
  profit_all_ratio_mean: number;
  profit_all_percent_sum: number;
  profit_all_ratio_sum: number;
  profit_all_percent: number;
  profit_all_ratio: number;
  profit_all_fiat: number;
  trade_count: number;
  closed_trade_count: number;
  first_trade_date: string;
  first_trade_timestamp: number;
  latest_trade_date: string;
  latest_trade_timestamp: number;
  avg_duration: string;
  best_pair: string;
  best_rate: number;
  winning_trades: number;
  losing_trades: number;
}

export interface Balance {
  currencies: Currency[];
  total: number;
  symbol: string;
  value: number;
  stake: string;
  note: string;
  starting_capital: number;
  starting_capital_ratio: number;
  starting_capital_pct: number;
  starting_capital_fiat: number;
  starting_capital_fiat_ratio: number;
  starting_capital_fiat_pct: number;
}

export interface Daily {
  data: Datum[];
  fiat_display_currency: string;
  stake_currency: string;
}

export interface Status {
  trade_id: number;
  pair: string;
  is_open: boolean;
  exchange: string;
  amount: number;
  amount_requested: number;
  stake_amount: number;
  strategy: string;
  buy_tag?: any;
  timeframe: number;
  fee_open: number;
  fee_open_cost: number;
  fee_open_currency: string;
  fee_close: number;
  fee_close_cost?: any;
  fee_close_currency?: any;
  open_date: string;
  open_timestamp: any;
  open_rate: number;
  open_rate_requested: number;
  open_trade_value: number;
  close_date?: any;
  close_timestamp?: any;
  close_rate?: any;
  close_rate_requested?: any;
  close_profit?: any;
  close_profit_pct?: any;
  close_profit_abs?: any;
  profit_ratio: number;
  profit_pct: number;
  profit_abs: number;
  profit_fiat: number;
  sell_reason: string;
  sell_order_status: string;
  stop_loss_abs: number;
  stop_loss_ratio: number;
  stop_loss_pct: number;
  stoploss_order_id?: any;
  stoploss_last_update: string;
  stoploss_last_update_timestamp: any;
  initial_stop_loss_abs: number;
  initial_stop_loss_ratio: number;
  initial_stop_loss_pct: number;
  min_rate: number;
  max_rate: number;
  open_order_id?: any;
  stoploss_current_dist: number;
  stoploss_current_dist_pct: number;
  stoploss_current_dist_ratio: number;
  stoploss_entry_dist: number;
  stoploss_entry_dist_ratio: number;
  current_profit: number;
  current_profit_abs: number;
  current_profit_pct: number;
  current_rate: number;
  open_order?: any;
}

export interface Performance {
  pair: string;
  profit: number;
  profit_abs: number;
  count: number;
}

export interface Trades {
  trades: Trade[];
  trades_count: number;
  total_trades: number;
}

/* FOR component responses */
export interface Trade {
  trade_id: number;
  pair: string;
  is_open: boolean;
  exchange: string;
  amount: number;
  amount_requested: number;
  stake_amount: number;
  strategy: string;
  buy_tag?: any;
  timeframe: number;
  fee_open: number;
  fee_open_cost: number;
  fee_open_currency: string;
  fee_close: number;
  fee_close_cost: number;
  fee_close_currency: string;
  open_date: string;
  open_timestamp: any;
  open_rate: number;
  open_rate_requested: number;
  open_trade_value: number;
  close_date: string;
  close_timestamp: any;
  close_rate: number;
  close_rate_requested: number;
  close_profit: number;
  close_profit_pct: number;
  close_profit_abs: number;
  trade_duration_s: number;
  trade_duration: number;
  profit_ratio: number;
  profit_pct: number;
  profit_abs: number;
  sell_reason: string;
  sell_order_status: string;
  stop_loss_abs: number;
  stop_loss_ratio: number;
  stop_loss_pct: number;
  stoploss_order_id?: any;
  stoploss_last_update: string;
  stoploss_last_update_timestamp: any;
  initial_stop_loss_abs: number;
  initial_stop_loss_ratio: number;
  initial_stop_loss_pct: number;
  min_rate: number;
  max_rate: number;
  open_order_id?: any;
}

export interface Currency {
  currency: string;
  free: number;
  balance: number;
  used: number;
  est_stake: number;
  stake: string;
}

export interface Datum {
  date: string;
  abs_profit: number;
  fiat_value: number;
  trade_count: number;
}

export interface Errors {}

export interface Token {
  identity: {
    u: string;
  };
  exp: number;
  iat: number;
  type: "access" | "refresh";
}
