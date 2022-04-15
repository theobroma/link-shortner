import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LinkAPI } from '../../@api/api';
import {
  LinkResponseSchema,
  LinkResponseType,
  LinkResultType,
} from '../../@types';
import { waitForMe } from '../../@utils/waitforme';

export const createShortLinkTC = createAsyncThunk<LinkResponseType, string>(
  'links/createShortLink',
  async (url, thunkAPI) => {
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
  },
);

const linkInitialState = {
  items: [] as LinkResultType[],
  // utils
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export type linkInitialStateType = typeof linkInitialState;

export const linkSlice = createSlice({
  name: 'links',
  initialState: linkInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createShortLinkTC.pending, (state) => {
      state.isFetching = true;
      //   clear data
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    });
    builder.addCase(createShortLinkTC.fulfilled, (state, action) => {
      const { ok, result } = action.payload;
      if (ok) {
        state.items.push(result);
        state.isSuccess = true;
      } else {
        state.isError = true;
      }
      state.isFetching = false;
    });
    builder.addCase(createShortLinkTC.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      if (action.payload instanceof Error) {
        state.errorMessage = action.payload.message;
      }
    });
  },
});
