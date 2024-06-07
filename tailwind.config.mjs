/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			sans: ["PlexSerif", "sans-serif"],
		},
		colors: {
			white: "#fffdea",
			black: "#121212",
			blue: "#00f",
		},
	},
	plugins: [],
};
