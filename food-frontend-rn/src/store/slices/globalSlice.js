import { createSlice } from '@reduxjs/toolkit';

import { signUp } from '../thunks/SignUp';

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
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { setError, setLoading } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
