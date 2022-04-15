import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_KEY = process.env.REACT_APP_API_KEY as string;
export const API_URL = process.env.REACT_APP_API_URL as string;
export const API_HOST = process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST as string;

const cryptoApiHeaders = {
  'x-rapidapi-key': API_KEY,
  'x-rapidapi-host': API_HOST,
};

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    // getCryptos: builder.query({
    //   query: (count) => createRequest(`/coins?limit=${count}`),
    // }),
    // getExchanges: builder.query({
    //   query: () => createRequest('/exchanges'),
    // }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history/${timeperiod}`),
    }),
  }),
});

export const {
  // useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  // useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
