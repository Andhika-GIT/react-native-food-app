import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    inProgress: [],
    pastOrders: [],
  },
  reducers: {
    setOrder(state, action) {
      state.orders = action.payload;
    },
    setInProgress(state, action) {
      state.inProgress = action.payload;
    },
    setPastOrders(state, action) {
      state.pastOrders = action.payload;
    },
  },
});

export const orderReducer = orderSlice.reducer;
export const { setOrder, setInProgress, setPastOrders } = orderSlice.actions;
