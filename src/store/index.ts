import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import reservationReducer from './reservationSlice';
import dishReducer from './dishSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reservations: reservationReducer,
    dishes: dishReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
