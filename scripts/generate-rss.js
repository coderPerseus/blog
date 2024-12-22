/* eslint-disable */
const { promises: fs } = require("fs");
const path = require("path");
const RSS = require("rss");
const matter = require("gray-matter");

async function generate() {
	const feed = new RSS({
		title: "幸运的蜗牛",
		description:
			"我是幸运的蜗牛，一名充满热情的前端开发工程师。我热衷于探索和体验最新技术，特别是人工智能（AI），并在日常工作中去使用它们，来提升我的工作效率。我的目标是积极参与开源社区，为开源项目贡献自己的力量。正如我的名字，我相信越努力，越幸运",
		site_url: "https://luckysnail.cn",
		feed_url: "https://luckysnail.cn/feed.xml",
	});

	// const posts = await fs.readdir(path.join(__dirname, '..', 'data', 'blog'));

	// 定义要读取的文件夹路径
	const folders = [
		path.join(__dirname, "..", "data", "blog"),
		path.join(__dirname, "..", "posts"),
	];

	// 读取所有文件夹中的文件
	const allPosts = await Promise.all(
		folders.map(async (folder) => {
			const files = await fs.readdir(folder);
			return files.map((file) => ({ file, folder }));
		}),
	);

	// 扁平化文件列表
	const flattenedPosts = allPosts.flat();
	await Promise.all(
		flattenedPosts.map(async ({ file, folder }) => {
			const content = await fs.readFile(path.join(folder, file));
			const frontmatter = matter(content);

			feed.item({
				title: frontmatter.data.title,
				url: "https://luckysnail.cn/posts/" + file.replace(/\.mdx?/, ""),
				date: frontmatter.data.publishedAt,
				description: frontmatter.data.summary,
			});
		}),
	);

	await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
}

// generate();
module.exports = generate;
