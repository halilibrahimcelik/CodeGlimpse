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
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".button-primary": {
          color: "#fff",
          backgroundColor: "#E45826",
          padding: "5px 10px",
          borderRadius: ".20rem",
          border: "1px solid #E45826",
          fontSize: "1rem",
          fontWeight: "500",
          transition: "all .3s ease-in",
          "&:hover": {
            backgroundColor: "#bd3200",
            color: "#fff",
          },
        },
        ".hide-element": {
          transform: "translateX(100%)",
          overflow: "hidden",
          visibility: "hidden",
          opacity: "0",
        },
        ".show-element": {
          transform: "translateX(0%)",
          overflow: "visible",
          visibility: "visible",
          opacity: "1",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
