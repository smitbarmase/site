/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		colors: {
			white: "#ffffff",
			"light-blue": "#2d2dff",
			blue: "#0000FF",
		},
		extend: {
			fontFamily: {
				sans: ["InterDisplay", "sans-serif"],
			},
		},
	},
	plugins: [],
};
