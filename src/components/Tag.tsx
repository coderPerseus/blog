"use client"; // 如果组件需要在客户端渲染

import { cn } from "@/lib/utils";
import type { FC, HTMLAttributes } from "react";

interface TagProps extends HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "outline"; // 可选的变体样式
	color?: "primary" | "secondary" | "success" | "warning" | "danger"; // 可选的颜色
}

const Tag: FC<TagProps> = ({
	children,
	// variant = 'default',
	// color = 'primary',
	className,
	...props
}) => {
	return (
		<div
			className={cn(
				"inline-flex items-center rounded-md px-3  text-xs font-medium bg-violet-200 text-violet-500 hover:bg-purple-500 hover:text-violet-900 dark:bg-violet-300 dark:text-violet-700",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export default Tag;
