import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

import { SITE_URL } from "./src/constants";

export default defineConfig({
  site: SITE_URL,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["nofollow", "noopener", "noreferrer"],
          properties: { class: "external-link" },
          protocols: ["http", "https", "mailto"],
        },
      ],
    ],
  },
});
