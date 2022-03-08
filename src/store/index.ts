import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './global';

const store = configureStore({
  reducer: {
    global: counterReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
