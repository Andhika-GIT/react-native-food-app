import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_HOST = {
  url: 'http://192.168.1.8:8000/api',
};

export const signUp = createAsyncThunk('users/signUp', async () => {
  axios
    .post(`${API_HOST.url}/register`, data)
    .then((res) => {
      // create data form type to upload photo
      const photoForUpload = new FormData();
      photoForUpload.append('file', photo);

      // call api to upload photo
      if (photo.isUploadPhoto) {
        axios
          .post(`${API_HOST.url}/api/user/photo`, photoForUpload, {
            headers: {
              Authorization: `${res.data.data.token_type} ${res.data.data.access_token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((resUpload) => {
            console.log(resUpload);
          })
          .catch((err) => {
            console.log(err);
            showMessage('upload photo failed');
          });
      }

      // register success
      dispatch(setLoading(false));
      showMessage('Register success', 'success');
      navigation.replace('SuccessSignUp');
    })
    .catch((err) => {
      console.log(err);
      dispatch(setLoading(false));
      showMessage('something went wrong');
    });
});
