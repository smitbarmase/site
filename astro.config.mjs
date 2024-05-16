import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import mdxLayoutPlugin from './src/plugins/mdx-layout.ts';

export default defineConfig({
	integrations: [mdx({ remarkPlugins: [mdxLayoutPlugin] })]
});
