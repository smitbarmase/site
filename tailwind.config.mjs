/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		colors: {
			gray: {
				50: "#F8F8F8",
				100: "#F2F2F2",
				200: "#e5e5e5",
				300: "#CDCED5",
				800: "#3b3b3b",
			},
			blue: "#E4E6F1",
		},
	},
	plugins: [],
};
