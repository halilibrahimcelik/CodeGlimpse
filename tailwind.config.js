/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
];
export const theme = {
  container: {},
  extend: {
    keyframes: {
      "accordion-down": {
        from: { height: 0 },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: 0 },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
    colors: {
      primaryBg: "#394867",
      primaryBgLight: "#394867",
      primaryBgDark: "#212A3E",
      darkYellow: "#F0A500",
      orange: "#E45826",
      grayLight: "#F7F7F7",
    },
  },
};
export const plugins = [
  tailwindcssAnimate,
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
];
