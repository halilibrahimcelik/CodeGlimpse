import bundle from "@/bundler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BundleState {
  [key: string]: {
    loading: boolean;
    code: string | null | undefined;
    error: string | null | undefined;
  };
}
const initialState: BundleState = {};

export interface MyArgs {
  id: string;
  input: string;
}
export const bundleCells = createAsyncThunk(
  "cells/bundleCells",
  async (args: MyArgs) => {
    try {
      const result: {
        code: string | null | undefined;
        error: string | null | undefined;
      } = await bundle(args.input);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
);

const bundleSlice = createSlice({
  initialState,
  name: "bundle",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bundleCells.pending, (state, action) => {
        const requestId = action.meta.arg.id;

        state[requestId] = {
          code: "",
          loading: true,
          error: "",
        };
      })
      .addCase(bundleCells.fulfilled, (state, action) => {
        const requestId = action.meta.arg.id;
        state[requestId] = {
          code: action?.payload?.code,
          loading: false,
          error: action?.payload?.error,
        };
      })
      .addCase(bundleCells.rejected, (state, action) => {
        const requestId = action.meta.arg.id;
        state[requestId] = {
          code: "",
          loading: false,
          error: action.error.message,
        };
      });
  },
});

export default bundleSlice.reducer;

export const selectBundleById =
  (id: string) => (state: { bundle: BundleState }) => {
    return state.bundle[id];
  };
export const selectBundleCode =
  (id: string) => (state: { bundle: BundleState }) => {
    return state.bundle[id]?.code;
  };
export const selectBundleError =
  (id: string) => (state: { bundle: BundleState }) => {
    return state.bundle[id]?.error;
  };
