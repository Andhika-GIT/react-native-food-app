import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    address: '',
    city: '',
    houseNumber: '',
    phoneNumber: '',
  },
  reducers: {
    setRegister(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.passwordConfirmation = action.payload.passwordConfirmation ? action.payload.passwordConfirmation : action.payload.password;
    },
    setAddress(state, action) {
      state.address = action.payload.address;
      state.city = action.payload.city;
      state.houseNumber = action.payload.houseNumber;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});

export const { setRegister, setAddress } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
