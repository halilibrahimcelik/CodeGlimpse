import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import globalSlice from "./features/globalSlice";
import thunk from "redux-thunk";
import cellSlice from "./features/cellSlice";
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = configureStore({
  reducer: {
    global: globalSlice,
    cell: cellSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
