import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  darkMode:
    localStorage.getItem("theme") === "dark-theme"
      ? true
      : localStorage.getItem("theme") === null
      ? true
      : false,
};
interface GlobalState {
  darkMode: boolean;
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
  },
});

export const { toggleDarkMode } = globalSlice.actions;
export const selectDarkMode = (state: { global: GlobalState }) =>
  state.global.darkMode;
export default globalSlice.reducer;
