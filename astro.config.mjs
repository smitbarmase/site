import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

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
      rehypeSlug,
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
