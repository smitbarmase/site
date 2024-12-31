import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

import { POSTS_DATA_DIR } from "./constants";

const posts = defineCollection({
  loader: glob({ pattern: ["**/*.md", "**/*.mdx"], base: POSTS_DATA_DIR }),
  schema: z.object({
    title: z.string(),
    type: z.enum(["writing"]).optional(),
    date: z.date().optional(),
  }),
});

export const collections = { posts };
