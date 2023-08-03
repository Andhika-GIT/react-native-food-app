import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    food: [],
  },
  reducers: {
    setFood(state, action) {
      state.food = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getFood.pending, (state, action) => {
  //     // state.food = 'test';
  //   });
  //   builder.addCase(getFood.rejected, (state, action) => {});
  //   builder.addCase(getFood.fulfilled, (state, { payload }) => {
  //     state.food = payload;
  //   });
  // },
});

export const homeReducer = homeSlice.reducer;
export const { setFood } = homeSlice.actions;
