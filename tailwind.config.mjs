/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["IBM Plex Sans", "sans-serif"],
			},
			colors: {
				background: "#d8d2cb",
				"background-dark": "#222222",
				shade: "#c8c2ba",
				"shade-dark": "#141414",
				link: "#002080",
				"link-dark": "#2f9bee",
				red: "#ff0000",
			},
		},
	},
	plugins: [],
};
