import type { CollectionEntry } from "astro:content";

import type { TreeNode } from "../types";

export function createTree(
	entries: CollectionEntry<"root">[]
): Record<string, TreeNode> {
	const tree: Record<string, TreeNode> = {
		root: {
			children: {},
			slug: "",
			level: 0,
		},
	};
	for (const entry of entries) {
		const parts = entry.id.split("/");
		let currentNode = tree.root.children;
		let currentLevel = 1;
		for (const part of parts) {
			if (part === "index.md") {
				continue;
			}
			const title = part.replace(/\.md$/, "").split("-").join(" ");
			if (!(title in currentNode)) {
				currentNode[title] = {
					children: {},
					slug: entry.slug,
					level: currentLevel,
				};
			}
			currentNode = currentNode[title].children;
			currentLevel++;
		}
	}
	return tree;
}
