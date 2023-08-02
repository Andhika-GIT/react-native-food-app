import { configureStore } from '@reduxjs/toolkit';

// slices
import { registerReducer, setRegister, setAddress } from './slices/registerSlice';
import { globalReducer, setError, setLoading } from './slices/globalSlice';
import { photoReducer, setPhoto, setUploadStatus } from './slices/photoSlice';

const store = configureStore({
  reducer: {
    register: registerReducer,
    global: globalReducer,
    photo: photoReducer,
  },
});

// export thunks
export * from './thunks/SignUp.js';
export * from './thunks/SignIn.js';

export { store, setRegister, setAddress, setError, setLoading, setPhoto, setUploadStatus };
