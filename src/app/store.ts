import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import globalSlice from "./features/globalSlice";
import thunk from "redux-thunk";
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = configureStore({
  reducer: {
    global: globalSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
