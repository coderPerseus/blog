import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
	name: "Post",
	filePathPattern: `**/*.mdx`,
	contentType: "mdx",

	fields: {
		title: { type: "string", required: true },
		description: { type: "string", required: false },
		tags: { type: "list", of: { type: "string" }, required: true },
		slug: { type: "string", required: true },
		author: { type: "string", required: true },
		cover: { type: "string", required: false },
		date: { type: "date", required: true },
	},
	computedFields: {
		url: {
			type: "string",
			resolve: (post) => `/posts/${post.slug}`,
		},
		readingTime: {
			type: "nested",
			resolve: (doc) => readingTime(doc.body.code),
		},
	},
}));

export default makeSource({
	// contentDirPath: 'posts',
	contentDirPath: ".",
	contentDirInclude: ["posts", "data/blog"],
	documentTypes: [Post],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			// 为代码添加特殊样式
			// @ts-ignore
			[rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
			// 为每个 header 添加 id
			rehypeSlug,
			//为 header 添加链接
			[
				rehypeAutolinkHeadings,
				{
					behavior: "wrap",
					properties: {
						className: ["anchor"],
					},
				},
			],
		],
	},
});
