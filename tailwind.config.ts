import type { Config } from "tailwindcss";

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
	corePlugins: {
		filter: false,
		backdropFilter: false,
		ringWidth: false,
		ringColor: false,
		ringOffsetWidth: false,
		ringOffsetColor: false,
		boxShadow: false,
		transform: false,
		touchAction: false,
		scrollSnapType: false,
		borderOpacity: false,
		textOpacity: false,
		fontVariantNumeric: false,
	},
	plugins: [],
} satisfies Config;
