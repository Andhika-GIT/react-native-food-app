import { configureStore } from '@reduxjs/toolkit';

// slices
import { registerReducer, setRegister, setAddress } from './slices/registerSlice';
import { globalReducer, setError, setLoading } from './slices/globalSlice';

const store = configureStore({
  reducer: {
    register: registerReducer,
    global: globalReducer,
  },
});

export { store, setRegister, setAddress, setError, setLoading };
