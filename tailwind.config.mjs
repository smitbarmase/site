/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist", "sans-serif"],
      },
    },
  },
  safelist: ["external-link"],
};
