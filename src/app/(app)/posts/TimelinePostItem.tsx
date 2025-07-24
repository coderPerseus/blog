import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tag } from './TagItem';
import { cn } from '@/lib/utils';
import { Post } from 'contentlayer/generated';

interface Props {
	post: Post;
	showCover?: boolean;
	isLast?: boolean;
}

export default function TimelinePostItem({ post, showCover, isLast }: Props) {
	return (
		<li
			className={cn(
				'relative pl-8 pb-8',
				!isLast && 'border-l border-zinc-300 dark:border-zinc-700'
			)}
		>
			<span className="absolute left-[-7px] top-2 flex h-3 w-3 rounded-full bg-violet-500 ring-2 ring-white dark:ring-zinc-900" />
			{showCover && post.cover && (
				<AspectRatio ratio={16 / 9} className="mb-3 rounded-md overflow-hidden">
					<Image
						src={post.cover}
						alt={post.title}
						fill
						unoptimized
						className="object-cover"
					/>
				</AspectRatio>
			)}
			<Link href={`/posts/${post.slug}`} className="group block">
				<h2 className="text-lg font-medium group-hover:text-violet-600 dark:group-hover:text-violet-400">
					{post.title}
				</h2>
			</Link>
			<div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
				<time dateTime={post.date}>
					{dayjs(post.date).format('YYYY-MM-DD')}
				</time>
				{post.tags.map((tag) => (
					<Tag key={tag}>{tag}</Tag>
				))}
			</div>
		</li>
	);
}
