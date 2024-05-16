import { defineConfig } from 'astro/config';

import mdLayoutPlugin from './src/plugins/md-layout.ts';

export default defineConfig({
	integrations: [],
	markdown: {
		rehypePlugins: [mdLayoutPlugin]
	}
});
