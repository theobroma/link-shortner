import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LinkAPI } from '../../@api/api';
import type { LinkResponseType, LinkResultType } from '../../@types';
import { LinkResponseSchema } from '../../@types';
import { waitForMe } from '../../@utils/waitforme';

export const createShortLinkTC = createAsyncThunk<LinkResponseType, string>(
  'links/createShortLink',
  async (url, thunkAPI) => {
    try {
      await waitForMe(3000);
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
  },
);

const linkInitialState = {
  items: [] as LinkResultType[],
  // utils
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: '' as string | null,
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
        }
        state.isLoading = false;
      })
      .addCase(createShortLinkTC.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
        }
      });
  },
});
