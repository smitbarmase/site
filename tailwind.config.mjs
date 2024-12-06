/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#2d2d2d",
        blue: "#3333ee",
        purple: "#6f42c1",
        white: "#ffffff",
        gray: "#f4f4f4",
      },
    },
  },
  safelist: ["external-link"],
};
