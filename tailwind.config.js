/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primaryBg: "#394867",
        primaryBgLight: "#394867",
        primaryBgDark: "#212A3E",
        darkYellow: "#F0A500",
        orange: "#E45826",
        grayLight: "#F7F7F7",
      },
    },
  },
  plugins: [],
};
