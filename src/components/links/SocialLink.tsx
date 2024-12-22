"use client";

import type { IconProps } from "@/assets";
import * as iconList from "@/assets/index";
import Douyin from "@/assets/media/douyin.webp";
import Qq from "@/assets/media/qq.webp";
import Wx from "@/assets/media/wx.webp";
import WxPublic from "@/assets/media/wxPublic.webp";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipPortal,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { copyTextToClipboard } from "@/lib";
import { makeBlurDataURL } from "@/lib/images";
import { AnimatePresence, motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link, { type LinkProps } from "next/link";
import type React from "react";
import type { FC } from "react";
import siteMetadata from "~/src/config/site";

type IconName = keyof typeof iconList;

type TypeSocialLinkProps = {
	platform?: Platform | string;
	icon?: string;
	isPicture?: boolean;
} & LinkProps &
	React.AnchorHTMLAttributes<HTMLAnchorElement>;

const IconComponents: Record<
	IconName,
	React.ComponentType<IconProps>
> = iconList;

type Platform =
	| "github"
	| "twitter"
	| "youtube"
	| "telegram"
	| "bilibili"
	| "mail"
	| "rss"
	| "微信"
	| "微信公众号";

const picMap: Record<string, StaticImageData> = {
	wx: Wx,
	wxPublic: WxPublic,
	douyin: Douyin,
	qq: Qq,
};
const PictureDialog = ({
	platform,
	href,
	children,
}: {
	platform?: Platform | string;
	href: string;
	children: React.ReactNode;
}) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] px-10 py-10">
				<div className="relative  w-34 h-auto">
					<Image
						src={picMap[href] as StaticImageData}
						alt={platform ?? siteMetadata.authorsCN}
						unoptimized
						placeholder="blur"
						blurDataURL={makeBlurDataURL(16, 16)}
						style={{
							width: "100%",
							height: "auto",
						}}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};
const LinkHrefWrapper: FC<TypeSocialLinkProps> = ({
	platform,
	href,
	children,
	...props
}) => {
	const textList = ["邮箱"];
	const isText = textList.includes(platform ?? "");
	return isText ? (
		<span
			onTouchEnd={() => copyTextToClipboard(href)}
			onClick={() => copyTextToClipboard(href)}
			onKeyUp={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					copyTextToClipboard(href);
				}
			}}
		>
			{children}
		</span>
	) : (
		<Link
			href={href}
			target="_blank"
			prefetch={false}
			aria-label={platform}
			{...props}
		>
			{children}
		</Link>
	);
};
export function SocialLink({
	platform,
	href,
	isPicture,
	icon,
	...props
}: TypeSocialLinkProps) {
	const Icon = IconComponents[icon as IconName];

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					{isPicture ? (
						<PictureDialog platform={platform} href={href}>
							{icon && (
								<Icon className="text-2xl text-zinc-400 transition group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200" />
							)}
						</PictureDialog>
					) : (
						<LinkHrefWrapper platform={platform} href={href} {...props}>
							{icon && (
								<Icon className="text-2xl text-zinc-400 transition group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200" />
							)}
						</LinkHrefWrapper>
					)}
				</TooltipTrigger>
				<AnimatePresence>
					<TooltipPortal>
						<TooltipContent>
							<motion.div
								initial={{ opacity: 0, scale: 0.96 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
							>
								{platform}
							</motion.div>
						</TooltipContent>
					</TooltipPortal>
				</AnimatePresence>
			</Tooltip>
		</TooltipProvider>
	);
}
