/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			serif: ["NimbusRoman", "sans-serif"],
			mono: ["NimbusMono", "monospace"],
		},
		colors: {
			white: "#f6f6f6",
			blue: "#0000ff",
			lightblue: "#599eff",
			black: "#1c1c1c",
			transparent: "transparent",
		},
	},
	plugins: [],
};
