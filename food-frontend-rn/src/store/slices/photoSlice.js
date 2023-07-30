import { createSlice } from '@reduxjs/toolkit';

const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    uri: '',
    type: '',
    name: '',
    isUploadPhoto: false,
  },
  reducers: {
    setPhoto(state, action) {
      state.uri = action.payload.uri;
      state.type = action.payload.type;
      state.name = action.payload.name;
    },
    setUploadStatus(state, action) {
      state.isUploadPhoto = action.payload;
    },
  },
});

export const { setPhoto, setUploadStatus } = photoSlice.actions;
export const photoReducer = photoSlice.reducer;
