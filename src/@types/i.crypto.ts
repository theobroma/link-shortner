export interface ICurrency {
  // only used fields
  id: number;
  name: string;
  rank: number;
  iconUrl: string;
  price: string;
  marketCap: number;
  change: number;
}

export interface ICryptoLinks {
  name: string;
  type: string;
  url: string;
}

export type CoinHistoryType = {
  price: string;
  timestamp: number;
};

// ======== Responses ========

export type CoinHistoryResponseType = {
  change: number;
  history: CoinHistoryType[];
};
