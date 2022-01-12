import { instance } from './api';

export const CoinrankingAPI = {
  getCoins() {
    return instance.get<any>(`/coins`);
  },
  getCryptoDetails(coinId: number) {
    return instance.get<any>(`/coin/${coinId}`);
  },
};
