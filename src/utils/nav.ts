import { dset } from "dset/merge";

import type { CollectionEntry } from "astro:content";

import type { TreeNode } from "../types";

export function createTree(
	entries: CollectionEntry<"root">[]
): Record<string, TreeNode> {
	const tree: Record<string, TreeNode> = {
		index: {
			children: {},
			path: "/",
			level: 0,
		},
	};
	for (const entry of entries) {
		const parts = entry.id.replace(/\.md$/, "").split("/");
		if (parts[parts.length - 1] === "index") {
			parts.pop();
		}
		if (!parts.length) {
			continue;
		}
		const node = {
			children: {},
			path: `/${parts.join("/")}`,
			level: parts.length,
		};
		const updatePath = `index.children.${parts
			.map(
				(part, index) =>
					`${part}${index !== parts.length - 1 ? ".children" : ""}`
			)
			.join(".")}`;
		dset(tree, updatePath, node);
	}
	return tree;
}
