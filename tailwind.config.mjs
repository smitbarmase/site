/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "selector",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			sans: ["Gelasio", "sans-serif"],
		},
		colors: {
			// light
			gray: "#222",
			lightgray: "#333",
			white: "#fff",
			blue: "#00f",
			// dark
			yellow: "#ffd",
			darkyellow: "#cc8",
			black: "#000",
			lightblue: "#19f",
			// common
			red: "#f00",
		},
	},
	plugins: [],
};
