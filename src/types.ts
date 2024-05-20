export interface TreeNode {
	children: Record<string, TreeNode>;
	path: string;
	level: number;
}
