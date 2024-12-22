import { HourglassIcon, TagIcon, UTurnLeftIcon } from "@/assets";
import { Container } from "@/components/Container";
import MDXComponents from "@/components/MDXComponents";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import siteMetadata from "@/config/site";
import { cn } from "@/lib/utils";
import { type Post, allPosts } from "contentlayer/generated";
import dayjs from "dayjs";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "../TagItem";
import Toc from "../Toc";

const variantStyles = {
	primary:
		"bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-200 dark:text-black dark:hover:bg-zinc-300 dark:active:bg-zinc-300/70",
	secondary:
		"group rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20",
};
interface TypeParams {
	id: string;
}
// 预渲染动态路由时生成所有可能的参数组合。
export async function generateStaticParams() {
	return allPosts.map((post) => ({
		id: post.slug,
	}));
}
export const generateMetadata = ({ params }: { params: TypeParams }) => {
	const post = allPosts.find((post) => post.slug === params.id);
	if (!post) throw new Error(`Post not found for id: ${params.id}`);
	const title = post.title;
	const description =
		post.description ?? `${post.title} - ${siteMetadata.authors}`;
	return {
		title,
		description,
		openGraph: {
			title,
			description,
		},
		titter: {
			title,
			description,
		},
		keywords: post.tags?.join(","),
	};
};

const Page = ({ params }: { params: TypeParams }) => {
	let postIndex = 0;
	const post = allPosts.find((post) => {
		postIndex++;
		return post.slug === params.id;
	});
	const sortedPosts = allPosts
		.sort((a, b) => {
			// 按照日期降序排序
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		})
		.slice(0, allPosts.length - 1);
	if (!post) notFound();
	const MDXContent = useMDXComponent(post.body.code);
	console.log(post.readingTime, "post");
	// 找到上一个和下一个帖子
	const prevPost = sortedPosts[postIndex - 2];
	const nextPost = sortedPosts[postIndex];
	const computeTitle = (p: Post) => {
		if (p.title.length > 20) {
			return `${p.title.slice(0, 20)}...`;
		}
		return p.title;
	};
	return (
		<Container.Outer className="mt-10 lg:mt-16">
			<Container.Inner className="!px-0">
				<div className="w-full md:flex md:justify-between xl:relative gap-1">
					<aside className="hidden w-[160px] shrink-0 lg:block">
						<div className="sticky top-2 pt-16">
							<Toc />
						</div>
					</aside>
					<div className="max-w-4xl md:flex-1 md:shrink-0 ">
						<Link
							href="/posts"
							className={cn(
								"group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0",
								variantStyles.secondary,
							)}
							aria-label="返回博客页面"
						>
							<UTurnLeftIcon className="h-8 w-8 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
						</Link>
						<article
							data-postid={post._id}
							className="rich-text-viewer prose px-4"
						>
							<div className="mb-8 text-center">
								{post.cover && (
									<AspectRatio
										ratio={16 / 9}
										className="bg-muted absolute left-0 top-0 rounded-md overflow-hidden"
									>
										<Image
											src={post.cover}
											alt={post.title}
											fill
											unoptimized
											className="object-cover"
										/>
									</AspectRatio>
								)}
								<h1 className="text-3xl font-bold">{post.title}</h1>
								<div className="flex justify-center rounded-md  h-5 items-center space-x-4 text-sm">
									<time
										dateTime={post.date}
										className="mb-1 text-xs text-gray-600"
									>
										{dayjs(post.date).format("YYYY-MM-DD")}
									</time>
									<Separator orientation="vertical" />
									<span className="mb-1 text-xs text-gray-600 flex items-center">
										<HourglassIcon className="mr-2" />{" "}
										{Math.ceil(post.readingTime?.minutes)} 分钟
									</span>
								</div>
								<div className="flex w-full justify-center gap-2 mt-2">
									{post.tags.map((tag) => (
										<Tag key={tag}>{tag}</Tag>
									))}
								</div>
								{/* 描述渲染 */}
								{post.description && (
									<div className="bg-gray-200 dark:bg-gray-600 relative p-4 rounded-md mt-4">
										<TagIcon className="absolute left-4 top-4" />
										<p className="text-gray-700 dark:text-gray-300">
											{post.description}
										</p>
									</div>
								)}
							</div>

							<div className="js-toc-content">
								{/* @ts-ignore */}
								<MDXContent components={MDXComponents} />
							</div>
						</article>
						{/* 上一个，下一个功能 */}
						<div className="flex px-4 justify-between mt-8">
							{/* 上一个 */}
							{prevPost ? (
								<Link
									href={`/posts/${prevPost.slug}`}
									className={cn(
										"inline-flex items-center justify-center rounded-md  px-4 py-2 text-sm  font-medium text-violet-500  dark:text-violet-300 shadow-sm hover:bg-violet-200 dark:hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2",
									)}
								>
									{computeTitle(prevPost)}
								</Link>
							) : (
								<span className="leading-10 text-zinc-500 dark:text-zinc-200">
									已经是第一个了
								</span>
							)}

							{/* 下一个 */}
							{nextPost ? (
								<Link
									href={`/posts/${nextPost.slug}`}
									className={cn(
										"inline-flex items-center justify-center rounded-md  px-4 py-2 text-sm font-medium text-violet-500 dark:text-violet-300 shadow-sm hover:bg-violet-200  dark:hover:bg-violet-500  focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2",
									)}
								>
									{computeTitle(nextPost)}
								</Link>
							) : (
								<span className="leading-10 text-zinc-500 dark:text-zinc-200">
									没有下一个啦
								</span>
							)}
						</div>
						{/* 文章还会出现的地址 */}
					</div>
				</div>
			</Container.Inner>
		</Container.Outer>
	);
};

export default Page;
