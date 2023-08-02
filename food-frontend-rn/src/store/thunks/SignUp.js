import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// utils
import { storeData, getData, showMessage } from "../../utils";

const API_HOST = {
  url: "http://192.168.1.8:8000/api",
};

export const signUp = createAsyncThunk(
  "users/signUp",
  async (userData, photoData) => {
    axios
      .post(`${API_HOST.url}/register`, userData)
      .then((res) => {
        // save token and user data to localstorage
        storeData("userProfile", res.data.data.user);

        storeData("token", {
          value: `${res.data.data.token_type} ${res.data.data.access_token}`,
        });

        // check if isUploadPhoto from photo slicer is true
        if (photoData.isUploadPhoto) {
          // create data form type to upload photo
          const photoForUpload = new FormData();
          photoForUpload.append("file", photoData);

          // call api to upload photo
          axios
            .post(`${API_HOST.url}/api/user/photo`, photoForUpload, {
              headers: {
                Authorization: `${res.data.data.token_type} ${res.data.data.access_token}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .catch((err) => {
              console.log(err);
              showMessage("upload photo failed");
            });
        }

        // register success
        dispatch(setLoading(false));
        navigation.replace("SuccessSignUp");
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
        showMessage("something went wrong");
      });
  }
);
