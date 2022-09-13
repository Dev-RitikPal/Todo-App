import { configureStore } from '@reduxjs/toolkit';
import userData from '../Redux/Reducers'

export const store = configureStore({
  reducer: {
    userData
  },
});
