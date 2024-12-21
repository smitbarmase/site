import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";

import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

import { SITE_URL } from "./src/constants";

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: "min-light",
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
