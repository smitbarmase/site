import type { RemarkPlugin } from '@astrojs/markdown-remark';
import picomatch from 'picomatch';

const mdxLayout: RemarkPlugin = () => {
	return function (_tree, file) {
		const [filePath] = file.history;
		const path = filePath.replace(/.*src\//, '');
		const glob = 'pages/**/*.mdx';
		const layoutPath = '/src/layouts/Layout.astro';
		if (picomatch.isMatch(path, glob)) {
			const metadata = file.data.astro as {
				frontmatter: { layout: string };
			};
			metadata.frontmatter.layout = layoutPath;
		}
	};
};

export default mdxLayout;
