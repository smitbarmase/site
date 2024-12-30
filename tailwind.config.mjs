/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{astro,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        page: "3rem", // 12
        "page-mobile": "1rem", // 4
      },
      fontFamily: {
        geist: ["Geist", "sans-serif"],
      },
      colors: {
        "nav-text": colors.stone[700],
        "nav-text-hover": colors.stone[500],
        "code-bg": colors.stone[50],
      },
    },
  },
  safelist: ["external-link"],
};
