/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{astro,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dejavu: ["DejavuSansMono", "monospace"],
      },
    },
  },
  safelist: ["external-link"],
};
