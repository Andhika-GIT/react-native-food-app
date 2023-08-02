import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// utils
import { storeData, showMessage } from '../../utils';

const API_HOST = {
  url: process.env.EXPO_PUBLIC_API_URL,
};

export const signIn = createAsyncThunk('users/signUp', async (data) => {
  const { userData, photoData } = data;

  axios
    .post('http://192.168.1.8:8000/api/login', form)
    .then((res) => {
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
});
