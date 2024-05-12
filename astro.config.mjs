import { defineConfig } from "astro/config";

import simpleStackStream from "simple-stack-stream";

// https://astro.build/config
export default defineConfig({
  integrations: [simpleStackStream()]
});