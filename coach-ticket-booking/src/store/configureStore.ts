import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import { accountSlice } from "../features/account/accountSlice";
import {bookingSlice} from "../features/booking/bookingSlice";

export const store = configureStore({
  reducer: {   
    account:accountSlice.reducer,
    booking:bookingSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;