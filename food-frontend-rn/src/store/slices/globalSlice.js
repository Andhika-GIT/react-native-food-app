import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isError: false,
    message: 'Error',
  },
  reducers: {
    setError(state, action) {
      state.isError = action.payload.isError;
      state.message = action.payload.message;
    },
  },
});

export const { setError } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
