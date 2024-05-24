/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			sans: ["InterDisplay", "sans-serif"],
			mono: ["IBM Plex Mono", "monospace"],
		},
		colors: {
			white: "#ffffff",
			blue: "#0000FF",
			"light-blue": "#3333FF",
			"lighter-blue": "#5454fb",
			black: "#000000",
		},
	},
	plugins: [require("tailwindcss-animate")],
};
