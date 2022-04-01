import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '@providers/store';

// here we are typing the types for the state
export type SimpleArrayState = {
  data: number[];
  pending: boolean;
  error: boolean;
};

const initialState: SimpleArrayState = {
  data: [],
  pending: false,
  error: false
};

// This action is what we will call using the dispatch in order to trigger the API call.
export const getSimpleArray = createAsyncThunk('simpleArray', async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ROOT}/simple-array`
  );
  return response.data;
});

export const simpleArraySlice = createSlice({
  name: 'simpleArray',
  initialState,
  reducers: {
    // leave this empty here
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices.
  // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes.
  // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
  extraReducers: (builder) => {
    builder
      .addCase(getSimpleArray.pending, (state) => {
        state.pending = true;
      })
      .addCase(getSimpleArray.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.pending = false;
        state.data = payload;
      })
      .addCase(getSimpleArray.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  }
});

export const simpleArray = (state: RootState) => state.simpleArray;
export default simpleArraySlice.reducer;