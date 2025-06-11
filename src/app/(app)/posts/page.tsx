import { Container } from '@/components/Container';
import { cn } from '@/lib/utils';
import { allPosts } from 'contentlayer/generated';
import CoverSwitch from './CoverSwitch';
import TimelinePostItem from './TimelinePostItem';

export interface PostItem {
	title: string;
	date: string;
	url: string;
	slug: string;
	tags: string[];
	description: string;
	author: string;
	cover?: string;
} // components/Tag.js
const title = '我的博客列表 | ';
const description =
	'记录在编程学习、工作中遇到的问题。我精心整理为技术博客文章合集，涵盖前端开发、React、Next.js等热门话题。发现实用的开发技巧、最佳实践和行业动态，提升您的开发技能。立即浏览最新文章！';
export const metadata = {
	title,
	description,
	openGraph: {
		title,
		description
	},
	twitter: {
		title,
		description,
		card: 'summary_large_image'
	}
};

export default function Posts() {
	// 	{
	// 	searchParams
	// }: {
	// 	searchParams: { s: string };
	// 	}
	// const showCover = searchParams ? Boolean(Number(searchParams?.s)) : false;
	const sortedPosts = allPosts
		.sort((a, b) => {
			// 按照日期降序排序
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		})
		.slice(0, allPosts.length - 1);
	return (
		<Container className="min-h-[50vh] mt-16">
			<header className="max-w-2xl mb-4">
				<div className="flex items-center ">
					<h1 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-xl">
						我的 blog
					</h1>
					<CoverSwitch />
				</div>
				<p className="mt-4 mb-6 text-base text-zinc-600 dark:text-zinc-400">
					记录工作，学习，生活中的所见所闻所想，主要分享领域 <b>前端开发</b>
					，偶尔也会记录 <b>其他内容</b>
				</p>
			</header>
			<ul className="mt-8">
				{sortedPosts.map((post, idx) => (
					<TimelinePostItem
						key={post._id}
						post={post}
						isLast={idx === sortedPosts.length - 1}
					/>
				))}
			</ul>
		</Container>
	);
}
