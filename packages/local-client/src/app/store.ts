import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import globalSlice from "./features/globalSlice";
import thunk from "redux-thunk";
import cellSlice, { saveCellsMiddleware } from "./features/cellSlice";
import { useSelector } from "react-redux";
import bundleSlice from "./features/bundleSlice";
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    global: globalSlice,
    cell: cellSlice,
    bundle: bundleSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, saveCellsMiddleware),
});
