import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    food: [],
    newTaste: [],
    popular: [],
    recommended: [],
  },
  reducers: {
    setFood(state, action) {
      state.food = action.payload;
    },
    setNewTaste(state, action) {
      state.newTaste = action.payload;
    },
    setPopular(state, action) {
      state.popular = action.payload;
    },
    setRecommended(state, action) {
      state.recommended = action.payload;
    },
  },
});

export const homeReducer = homeSlice.reducer;
export const { setFood, setNewTaste, setPopular, setRecommended } = homeSlice.actions;
