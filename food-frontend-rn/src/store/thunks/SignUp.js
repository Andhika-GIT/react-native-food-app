import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// utils
import { storeData, showMessage } from '../../utils';

const API_HOST = {
  url: 'http://192.168.1.8:8000/api',
};

export const signUp = createAsyncThunk('users/signUp', async (data) => {
  const { userData, photoData } = data;
  console.log(userData);
  console.log(photoData);
  axios
    .post(`${API_HOST.url}/register`, userData)
    .then((res) => {
      storeData('token', {
        value: `${res.data.data.token_type} ${res.data.data.access_token}`,
      });

      // check if isUploadPhoto from photo slicer is true
      if (photoData.isUploadPhoto) {
        // create data form type to upload photo
        const photoForUpload = new FormData();
        photoForUpload.append('file', photoData);

        // call api to upload photo
        axios
          .post(`${API_HOST.url}/user/photo`, photoForUpload, {
            headers: {
              Authorization: `${res.data.data.token_type} ${res.data.data.access_token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .catch((err) => {
            console.log(err);
            showMessage('upload photo failed');
          });
      }
    })
    .catch((err) => {
      console.log(err);
      showMessage('something went wrong');
    });
});
