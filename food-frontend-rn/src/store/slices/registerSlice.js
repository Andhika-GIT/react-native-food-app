import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
  reducers: {
    setRegister(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.password_confirmation = action.payload.passwordConfirmation ? action.payload.passwordConfirmation : action.payload.password;
    },
  },
});

export const { setRegister, setAddress } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
