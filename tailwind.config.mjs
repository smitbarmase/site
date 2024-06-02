/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			serif: ["NimbusRoman", "sans-serif"],
			mono: ["NimbusMono", "monospace"],
		},
		colors: {
			white: "#ffffff",
			blue: "#0000ff",
			black: "#000000",
			transparent: "transparent",
		},
	},
	plugins: [],
};
