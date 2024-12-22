"use client";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import siteMetadata from "@/config/site";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navigationItems = siteMetadata.navigationItems;

const DropdownNavItem = ({
	children,
	href,
}: {
	children: React.ReactNode;
	href: string;
}) => (
	<NavigationMenu delayDuration={100}>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuTrigger className="bg-transparent px-0 py-0 h-auto">
					{children}
				</NavigationMenuTrigger>
				<NavigationMenuContent>
					{siteMetadata.moreItems[href]?.map((item) => (
						<Link
							prefetch
							key={item.href}
							className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
							href={item.href}
						>
							{item.text}
						</Link>
					))}
				</NavigationMenuContent>
			</NavigationMenuItem>
		</NavigationMenuList>
		{/* <NavigationMenuViewport className="left-[-10px]" /> */}
	</NavigationMenu>
);

function NavItem({
	href,
	children,
	menu,
}: {
	href: string;
	children: React.ReactNode;
	menu: boolean | undefined;
}) {
	const moreHrefList = ["/icon"];
	const formatHref = (href: string) => {
		if (moreHrefList.includes(href)) {
			return "/more";
		}
		return href;
	};

	const isActive = formatHref(usePathname()) === href;
	const ActiveBox = () => (
		<motion.span
			className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-violet-600/0 via-violet-600/70 to-violet-500/0 dark:from-violet-400/0 dark:via-violet-400/40 dark:to-violet-400/0"
			layoutId="active-nav-item"
		/>
	);
	return (
		<li
			className={cn(
				"relative block whitespace-nowrap px-3 py-2 transition",
				isActive
					? "text-violet-500 dark:text-violet-400"
					: "hover:text-violet-500 dark:hover:text-violet-400",
			)}
		>
			{menu ? (
				<DropdownNavItem href={href}>
					<>
						{children}
						{isActive && <ActiveBox />}
					</>
				</DropdownNavItem>
			) : (
				<Link
					href={href}
					prefetch
					target={href === "/feed.xml" ? "_blank" : "_self"}
				>
					{children}
					{isActive && <ActiveBox />}
				</Link>
			)}
		</li>
	);
}

function Desktop({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const radius = useMotionValue(0);
	const handleMouseMove = React.useCallback(
		({ clientX, clientY, currentTarget }: React.MouseEvent) => {
			const bounds = currentTarget.getBoundingClientRect();
			mouseX.set(clientX - bounds.left);
			mouseY.set(clientY - bounds.top);
			radius.set(Math.sqrt(bounds.width ** 2 + bounds.height ** 2) / 2.5);
		},
		[mouseX, mouseY, radius],
	);
	const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color) 0%, transparent 65%)`;

	return (
		<nav
			onMouseMove={handleMouseMove}
			className={cn(
				"group relative",
				"rounded-full bg-gradient-to-b from-zinc-50/70 to-white/90",
				"shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md",
				"dark:from-zinc-900/70 dark:to-zinc-800/90 dark:ring-zinc-100/10",
				"[--spotlight-color:rgb(236_252_203_/_0.6)] dark:[--spotlight-color:rgb(217_249_157_/_0.07)]",
				className,
			)}
			{...props}
		>
			<motion.div
				className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{ background }}
				aria-hidden="true"
			/>

			<ul className="flex bg-transparent px-3 text-sm font-medium text-zinc-800 dark:text-zinc-200 ">
				{navigationItems.map(({ href, text, menu }) => (
					<NavItem key={href} href={href} menu={menu}>
						{text}
					</NavItem>
				))}
			</ul>
		</nav>
	);
}

function MobileNavItem({
	href,
	onClose,
	children,
}: Readonly<{
	href: string;
	onClose: () => void;
	children: React.ReactNode;
}>) {
	return (
		<li onClick={onClose} onKeyUp={(e) => e.key === "Enter" && onClose()}>
			<Link href={href} prefetch={true} className="block py-2">
				{children}
			</Link>
		</li>
	);
}

function Mobile(props: React.HTMLAttributes<HTMLDivElement>) {
	const [open, setOpen] = React.useState(false);
	return (
		<Popover open={open} {...props}>
			<PopoverTrigger asChild>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={() => setOpen(!open)}
					className={cn(
						"group flex items-center rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80",
						props.className,
					)}
				>
					前往
					<svg
						viewBox="0 0 8 6"
						aria-hidden="true"
						className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
					>
						<path
							d="M1.75 1.75 4 4.25l2.25-2.5"
							fill="none"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-screen max-w-[300px] p-0">
				{/* <div className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur dark:bg-black/80" /> */}
				<div className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-black dark:ring-zinc-800">
					<div className="flex flex-row items-center justify-between">
						<h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
							站内导航
						</h2>
					</div>
					<nav className="mt-6">
						<ul className="-my-2 divide-y divide-zinc-500/20 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
							{navigationItems.map(({ href, text }) => (
								<MobileNavItem
									key={href}
									href={href}
									onClose={() => setOpen(!open)}
								>
									{text}
								</MobileNavItem>
							))}
						</ul>
					</nav>
				</div>
			</PopoverContent>
		</Popover>
	);
}

export const NavigationBar = {
	Desktop,
	Mobile,
} as const;
