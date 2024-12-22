// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
/* eslint-disable */
const GitHub = require("github-api");
const fs = require("fs-extra");
const path = require("path");
// console.log(process.env, ' process.env');
const { GH_TOKEN, GH_USER, GH_PROJECT_NAME } = process.env;

const gh = new GitHub({
	token: GH_TOKEN,
});

const blogOutputPath = "../../data/blog";

if (!GH_USER || !GH_PROJECT_NAME) {
	console.error("请设置GITHUB_USER和GITHUB_PROJECT_NAME");
	process.exit(-1);
}

// 如果是 img 标签，并且没有闭合，那么就拼接闭合字符
function closeImgTag(htmlString) {
	// 使用正则表达式匹配未闭合的 <img> 标签
	const imgTagRegex = /<img([^>]*)(?<!\/)>/g;
	// 将未闭合的 <img> 标签替换为自闭合的 <img /> 标签
	return htmlString.replace(imgTagRegex, "<img$1 />");
}

// get blog list
const issueInstance = gh.getIssues(GH_USER, GH_PROJECT_NAME);
function generateMdx(issue, fileName) {
	console.log(issue, "issue");
	const { title, labels, created_at, body, html_url, user } = issue;
	return `---
title: ${title.trim()}
date: ${created_at}
slug: ${fileName}
author: ${user?.login}：${user?.html_url}
tags: ${JSON.stringify(labels.map((item) => item.name))}
---

${closeImgTag(body.replace(/<br \/>/g, "\n"))}

---
此文自动发布于：<a href="${html_url}" target="_blank">github issues</a>
`;
}

function main() {
	const filePath = path.resolve(__dirname, blogOutputPath);
	// 只查询自己的issues，避免别人创建的也更新到博客
	const creators = ["chaseFunny", "coderPerseus"]; // 添加多个creator
	fs.ensureDirSync(filePath);
	fs.emptyDirSync(filePath);
	creators.forEach((name) => {
		issueInstance.listIssues({ creator: name }).then(({ data }) => {
			let successCount = 0;
			for (const item of data) {
				try {
					const fileName = `post-${item.number}`;
					const content = generateMdx(item, fileName);
					fs.writeFileSync(`${filePath}/${fileName}.mdx`, content);
					console.log(`${filePath}/${fileName}.mdx`, "success");
					successCount++;
				} catch (error) {
					console.log(error);
				}
			}
			if (successCount === data.length) {
				console.log("文章全部同步成功！", data.length);
			} else {
				console.log("文章同步失败！失败数量=", data.length - successCount);
			}
		});
	});
}

module.exports = main;
