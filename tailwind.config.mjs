/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["LibertinusSerif", "sans-serif"],
    },
    colors: {
      darkgray: "#1b1b1b", // dark background, light text
      gray: "#323232", // dark border
      lightblue: "#2f9bee", // dark link

      white: "#efefef", // light background, dark text
      lightgray: "#bfbfbf", // light border
      blue: "#0000ff", // light link

      red: "#f00000", // common
      black: "#000000", // common
    },
  },
  plugins: [],
};
