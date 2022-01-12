import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CoinrankingAPI } from '../../@api/coinranking-api';
import { waitForMe } from '../../@utils/waitforme';

const coinsInitialState = {
  data: {
    coins: Array(20).fill('none'),
  } as any,
  // utils
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export type coinsInitialStateType = typeof coinsInitialState;

// https://stackoverflow.com/questions/67279037/the-thunkapi-getstate-method-does-not-correctly-infer-the-state-type
export const getCoinsTC = createAsyncThunk<any, void, any>(
  'coins/getCoins',
  async (_, thunkAPI) => {
    // const state = thunkAPI.getState();
    try {
      await waitForMe(300);
      const res = await CoinrankingAPI.getCoins();
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const coinsSlice = createSlice({
  name: 'coins',
  initialState: coinsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoinsTC.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getCoinsTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload.data;
      }
      state.isFetching = false;
      state.isSuccess = true;
    });
    builder.addCase(getCoinsTC.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      if (action.payload instanceof Error) {
        state.errorMessage = action.payload.message;
      }
    });
  },
});

export const coinsReducer = coinsSlice.reducer;
