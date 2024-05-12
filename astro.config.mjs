import { defineConfig } from "astro/config";
import simpleStackStream from "simple-stack-stream";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
	integrations: [simpleStackStream()],
	output: "server",
	adapter: vercel(),
});
