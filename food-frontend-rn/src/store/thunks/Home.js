import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ENV
import { API_URL } from '@env';

// utils
import { storeData, showMessage } from '../../utils';

// actions reducers
import { setFood } from '../slices/homeSlice';

export const getFood = createAsyncThunk('home/getFood', async (data, { dispatch }) => {
  axios
    .get(`${API_URL}/food`)
    .then((response) => {
      //   console.log(response.data.data.data);
      dispatch(setFood(response.data.data.data));
    })
    .catch((err) => {
      console.log(err);
    });
});
