import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ENV
import { API_URL } from '@env';

// utils
import { getData } from '../../utils';

// action reducers
import { setOrder, setInProgress, setPastOrders } from '../slices/orderSlice';

export const getOrders = createAsyncThunk('order/getOrders', async (data, { dispatch }) => {
  const resToken = await getData('token');
  console.log(resToken.value);

  axios
    .get(`${API_URL}/transaction`, {
      headers: {
        Authorization: resToken.value,
      },
    })
    .then((res) => {
      dispatch(setOrder(res.data.data.data));
    })
    .catch((err) => console.log(err));
});

export const getInProgress = createAsyncThunk('order/getInProgress', async (data, { dispatch }) => {
  const resToken = await getData('token');
  console.log(resToken.value);

  axios
    .get(`${API_URL}/transaction`, {
      headers: {
        Authorization: resToken.value,
      },
      params: {
        status: 'PENDING',
      },
    })
    .then((res) => {
      dispatch(setInProgress(res.data.data.data));
    })
    .catch((err) => console.log(err));
});
