import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isError: false,
    isLoading: false,
    message: 'Error',
  },
  reducers: {
    setError(state, action) {
      state.isError = action.payload.isError;
      state.message = action.payload.message;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setError, setLoading } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
