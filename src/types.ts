export interface TreeNode {
	children: Record<string, TreeNode>;
	slug: string;
	level: number;
}
