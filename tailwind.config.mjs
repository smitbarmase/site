/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "selector",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			sans: ["LibertinusSerif", "sans-serif"],
		},
		colors: {
			// dark
			gray: "#1b1b1b",
			lightgray: "#2c2c2c",
			white: "#efefef",
			blue: "#0000ff",
			// light
			yellow: "#ffffdd",
			darkyellow: "#efefb9",
			black: "#0d0d0d",
			lightblue: "#2f9bee",
			// common
			red: "#f00000",
		},
	},
	plugins: [],
};
