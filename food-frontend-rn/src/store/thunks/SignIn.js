import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ENV
import { API_URL } from '@env';

// utils
import { storeData, showMessage } from '../../utils';

// actions reducers
import { setLoading } from '../slices/globalSlice';

const API_HOST = {
  url: API_URL,
};

export const signIn = createAsyncThunk('users/signIn', async (form, { dispatch }) => {
  console.log(API_URL);
  axios
    .post(`${API_HOST.url}/login`, form)
    .then((res) => {
      // store token into localstorage
      storeData('token', {
        value: `${res.data.data.token_type} ${res.data.data.access_token}`,
      });

      // store profile into localstorge
      const profile = res.data.data.user;
      console.log(profile);
      storeData('userProfile', profile);
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err.message);
    });
});
