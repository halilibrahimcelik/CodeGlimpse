import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  darkMode:
    localStorage.getItem("theme") === "dark-theme"
      ? true
      : localStorage.getItem("theme") === null
      ? true
      : false,
  input: "",
  textValue: "# Hello World",
};
interface GlobalState {
  darkMode: boolean;
  input: string;
  textValue: string;
}
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      const theme = localStorage.getItem("theme");
      if (theme === null) {
        console.log("test");
        localStorage.setItem("theme", "dark-theme");
      }
      if (theme === "dark-theme") {
        document.documentElement.classList.add("dark");
        state.darkMode = true;
      } else {
        document.documentElement.classList.remove("dark");
        state.darkMode = false;
      }
    },
    setInput(state, action) {
      state.input = action.payload;
    },
    setTextValue(state, action) {
      state.textValue = action.payload;
    },
  },
});

export const { toggleDarkMode, setInput, setTextValue } = globalSlice.actions;
export const selectDarkMode = (state: { global: GlobalState }) =>
  state.global.darkMode;
export const getSelectedInput = (state: { global: GlobalState }) =>
  state.global.input;
export const getTextValue = (state: { global: GlobalState }) =>
  state.global.textValue;
export default globalSlice.reducer;
