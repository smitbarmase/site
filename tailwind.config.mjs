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
			lightgray: "#323232",
			white: "#efefef",
			blue: "#0000ff",
			// light
			yellow: "#ffffdd",
			darkyellow: "#e4e4ac",
			black: "#0d0d0d",
			lightblue: "#2f9bee",
			// common
			red: "#f00000",
		},
	},
	plugins: [],
};
