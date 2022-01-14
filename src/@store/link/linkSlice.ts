import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LinkAPI } from '../../@api/api';
import { LinkResponseSchema, LinkResponseType } from '../../@types';
import { waitForMe } from '../../@utils/waitforme';

export const createShortLinkTC = createAsyncThunk<
  LinkResponseType,
  string,
  any
>('links/createShortLink', async (url, thunkAPI) => {
  try {
    await waitForMe(300);
    const res = await LinkAPI.getShortLink(url);

    // ZOD validation
    try {
      LinkResponseSchema.parse(res.data);
    } catch (error) {
      console.log(error);
    }

    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

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
