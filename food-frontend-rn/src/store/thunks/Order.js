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

// 37478329105

//

export const getInProgress = createAsyncThunk('order/getInProgress', async (data, { dispatch }) => {
  const resToken = await getData('token');
  console.log(resToken.value);
  axios
    .all([
      axios.get(`${API_URL}/transaction`, {
        headers: {
          Authorization: resToken.value,
        },
        params: {
          status: 'PENDING',
        },
      }),
      axios.get(`${API_URL}/transaction`, {
        headers: {
          Authorization: resToken.value,
        },
        params: {
          status: 'SUCCESS',
        },
      }),
      axios.get(`${API_URL}/transaction`, {
        headers: {
          Authorization: resToken.value,
        },
        params: {
          status: 'ON_DELIVERY',
        },
      }),
    ])
    .then(
      axios.spread((resPending, resSuccess, resOnDelivery) => {
        const pending = resPending.data.data.data;
        const success = resSuccess.data.data.data;
        const onDelivery = resOnDelivery.data.data.data;
        dispatch(setInProgress([...pending, ...success, ...onDelivery]));
      })
    )
    .catch((err) => console.log(err));
});
export const getPastOrders = createAsyncThunk('order/getPastOrders', async (data, { dispatch }) => {
  const resToken = await getData('token');
  console.log(resToken.value);

  axios
    .all([
      axios.get(`${API_URL}/transaction`, {
        headers: {
          Authorization: resToken.value,
        },
        params: {
          status: 'CANCELLED',
        },
      }),
      axios.get(`${API_URL}/transaction`, {
        headers: {
          Authorization: resToken.value,
        },
        params: {
          status: 'DELIVERED',
        },
      }),
    ])
    .then(
      axios.spread((resCancelled, resDelivered) => {
        const cancelled = resCancelled.data.data.data;
        const delivered = resDelivered.data.data.data;

        dispatch(setPastOrders([...cancelled, ...delivered]));
      })
    )
    .catch((err) => console.log(err));
});
