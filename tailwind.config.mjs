/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				serif: ["NimbusRoman", "sans-serif"],
				mono: ["NimbusMono", "monospace"],
			},
			colors: {
				blue: "#0000FF",
				"light-blue": "#3333FF",
				"lighter-blue": "#6e6efe",
			},
		},
	},
	plugins: [],
};
