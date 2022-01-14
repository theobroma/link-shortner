import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://api.shrtco.de/v2/shorten?url=';

// export const createShortLink = createAsyncThunk(
//   'links/createShortLink',
//   async (url) => {
//     const response = await fetch(API_BASE_URL + url, { method: 'POST' });
//     return await response.json();
//   },
// );

const linkInitialState = {
  items: [] as any,
  loading: 'idle' as string,
};

export type linkInitialStateType = typeof linkInitialState;

export const linkSlice = createSlice({
  name: 'links',
  initialState: linkInitialState,
  reducers: {},
  extraReducers: {
    // [createShortLink.rejected]: (state) => {
    //   state.loading = 'rejected';
    // },
    // [createShortLink.pending]: (state) => {
    //   state.loading = 'loading';
    // },
    // [createShortLink.fulfilled]: (state, action) => {
    //   const { ok, result } = action.payload;
    //   if (ok) {
    //     state.items.push(result);
    //     state.loading = 'idle';
    //   } else {
    //     state.loading = 'error';
    //   }
    // },
  },
});

// export const selectLoading = (state) => state.links.loading;
// export const selectLinks = (state) => state.links.items;
// export default linkSlice.reducer;
