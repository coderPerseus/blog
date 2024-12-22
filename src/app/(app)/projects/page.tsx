import { Container } from "@/components/Container";
import type { Metadata } from "next";
import { Projects } from "./Projects";
const technologyList = [
	"HTML",
	"CSS",
	"JavaScript",
	"React",
	"Vue",
	"Next.js",
	"tailwindcss",
	"TypeScript",
	"node",
	"Nest.js",
	"vite",
	"webpack",
];
const title = "我的项目";
const description = `我在工作和自己学习过程中开发的一些项目，主要是前端领域，包括的技术有：${technologyList.join(",")}等现代技术栈实践。这里汇集了企业级应用、响应式网站和创新性Web解决方案。了解我的技术实力与项目经验。`;
export const metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
	},
	twitter: {
		title,
		description,
		card: "summary_large_image",
	},
} satisfies Metadata;

export default function ProjectsPage() {
	return (
		<Container className="mt-16 sm:mt-32">
			<header className="max-w-2xl">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					我的项目
				</h1>
				<p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
					这是我在开发和维护的项目，有<b>公司项目</b>，也有<b>个人项目</b>
				</p>
			</header>
			<div className="mt-16 sm:mt-20">
				<Projects />
			</div>
		</Container>
	);
}

export const revalidate = 3600;
