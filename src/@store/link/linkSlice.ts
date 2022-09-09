import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LinkAPI } from '../../@api/api';
import type { LinkResponseType, LinkResultType } from '../../@types';
import { LinkResponseSchema } from '../../@types';
import { waitForMe } from '../../@utils/waitforme';

export const createShortLinkTC = createAsyncThunk<
  LinkResponseType,
  string,
  { rejectValue: any }
>('links/createShortLink', async (url, thunkAPI) => {
  try {
    await waitForMe(1000);
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
  items: [] as LinkResultType[],
  // utils
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: '' as string | null | undefined,
};

export type linkInitialStateType = typeof linkInitialState;

export const linkSlice = createSlice({
  name: 'links',
  initialState: linkInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createShortLinkTC.pending, (state) => {
        state.isLoading = true;
        //   clear data
        state.isSuccess = false;
        state.isError = false;
        state.error = '';
      })
      .addCase(createShortLinkTC.fulfilled, (state, action) => {
        const { ok, result } = action.payload;
        if (ok) {
          state.items.push(result);
          state.isSuccess = true;
        } else {
          state.isError = true;
          state.error = action.payload.error;
        }
        state.isLoading = false;
      })
      .addCase(createShortLinkTC.rejected, (state, action) => {
        if (action.payload.ok === false) {
          state.error = action.payload.error;
        }
        state.isLoading = false;
        state.isError = true;
      });
  },
});
