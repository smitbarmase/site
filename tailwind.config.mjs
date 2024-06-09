/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			sans: ["NimbusRomNo9L", "sans-serif"],
		},
		colors: {
			white: "#fff",
			yellow: "#ffd",
			black: "#000",
			blue: "#00f",
			red: "#f00",
		},
	},
	plugins: [],
};
