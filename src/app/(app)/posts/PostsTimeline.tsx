'use client';

import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { Post } from 'contentlayer/generated';

import { Tag } from './TagItem';

interface PostsTimelineProps {
	posts: Post[];
}

interface GroupedPosts {
	year: string;
	items: Post[];
}

export function PostsTimeline({ posts }: PostsTimelineProps) {
	const [query, setQuery] = useState('');
	const normalizedQuery = query.trim().toLowerCase();

	const filteredPosts = useMemo(() => {
		if (!normalizedQuery) return posts;

		return posts.filter((post) => {
			const haystack = [post.title, post.description, ...(post.tags ?? [])]
				.join(' ')
				.toLowerCase();
			return haystack.includes(normalizedQuery);
		});
	}, [posts, normalizedQuery]);

	const groupedPosts = useMemo<GroupedPosts[]>(() => {
		const map = new Map<string, Post[]>();

		filteredPosts.forEach((post) => {
			const year = dayjs(post.date).format('YYYY');
			if (!map.has(year)) {
				map.set(year, []);
			}
			map.get(year)!.push(post);
		});

		return Array.from(map.entries())
			.map(([year, items]) => ({
				year,
				items
			}))
			.sort((a, b) => Number(b.year) - Number(a.year));
	}, [filteredPosts]);

	return (
		<div className="space-y-10">
			<div className="relative max-w-xl">
				<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<input
					type="search"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder="搜索文章标题、标签或简介"
					aria-label="搜索文章"
					className="w-full rounded-md border border-zinc-200 bg-background py-2 pl-10 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
				/>
			</div>

			{filteredPosts.length === 0 ? (
				<p className="text-sm text-muted-foreground">
					没有找到与“
					<span className="text-foreground">{query}</span>
					”相关的文章。
				</p>
			) : (
				<div className="space-y-12">
					{groupedPosts.map(({ year, items }) => (
						<section key={year} className="space-y-6">
							<div className="flex items-center gap-3">
								<div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-foreground">
									{year}
								</div>
								<div className="flex-1 border-t border-dashed border-border/70" />
							</div>
							<div className="space-y-8 border-l border-border/60 pl-6 dark:border-border/40">
								{items.map((post) => (
									<article key={post.slug} className="relative">
										<span className="absolute -left-[9px] top-1.5 inline-flex h-3 w-3 items-center justify-center rounded-full border-2 border-background bg-violet-500 shadow dark:border-zinc-950 dark:bg-violet-400" />
										<div className="rounded-lg border border-border/60 bg-card/40 p-4 transition-colors hover:border-violet-500/40 hover:bg-card">
											<div className="flex flex-col gap-2">
												<time
													dateTime={post.date}
													className="text-xs uppercase tracking-wide text-muted-foreground"
												>
													{dayjs(post.date).format('YYYY-MM-DD')}
												</time>
												<Link
													href={`/posts/${post.slug}`}
													className="text-lg font-semibold text-foreground transition-colors hover:text-violet-600 dark:hover:text-violet-400"
												>
													{post.title}
												</Link>
												{post.description ? (
													<p className="text-sm leading-relaxed text-muted-foreground">
														{post.description}
													</p>
												) : null}
												{post.tags?.length ? (
													<div className="mt-1 flex flex-wrap gap-2">
														{post.tags.map((tag) => (
															<Tag key={tag}>{tag}</Tag>
														))}
													</div>
												) : null}
											</div>
										</div>
									</article>
								))}
							</div>
						</section>
					))}
				</div>
			)}
		</div>
	);
}
