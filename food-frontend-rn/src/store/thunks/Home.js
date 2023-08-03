import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ENV
import { API_URL } from '@env';

// utils
import { storeData, showMessage } from '../../utils';

// actions reducers
import { setFood, setNewTaste, setPopular, setRecommended } from '../slices/homeSlice';

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
export const getFoodDataByTypes = createAsyncThunk('home/getFoodTypes', async (types, { dispatch }) => {
  axios
    .get(`${API_URL}/food?types=${types}`)
    .then((response) => {
      //   console.log(response.data.data.data);
      if (types === 'new_food') {
        console.log(types);
        dispatch(setNewTaste(response.data.data.data));
      }
      if (types === 'popular') {
        dispatch(setPopular(response.data.data.data));
      }
      if (types === 'recommended') {
        dispatch(setRecommended(response.data.data.data));
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
