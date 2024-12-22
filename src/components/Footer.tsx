import { PeekabooLink } from "@/components/links/PeekabooLink";
import siteMetadata from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { Container } from "./Container";

const navigationItems = siteMetadata.navigationItems;
function NavLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="transition hover:text-violet-500 dark:hover:text-violet-400"
		>
			{children}
		</Link>
	);
}

function Links() {
	return (
		<nav className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
			{navigationItems.map(({ href, text }) => (
				<NavLink key={href} href={href}>
					{text}
				</NavLink>
			))}
		</nav>
	);
}

export function Footer() {
	return (
		<footer className="mt-32">
			<Container.Outer>
				<div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
					<Container.Inner>
						{/* <div className="mx-auto mb-8 max-w-md">
							<Newsletter subCount={`${subs?.subCount ?? '0'}`} />
						</div> */}
						<div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
							<p className="text-sm text-zinc-500/80 dark:text-zinc-400/80">
								&copy; {new Date().getFullYear()} {siteMetadata.authorsCN}
								&nbsp;网站已开源：
								<PeekabooLink href="https://github.com/coderPerseus/blog">
									luckySnail
								</PeekabooLink>
							</p>
							<Links />
						</div>
					</Container.Inner>
					<Container.Inner className="mt-6">
						<div className="flex flex-col items-center justify-start gap-2 sm:flex-row">
							欢迎 👏🏻 你的访问
						</div>
					</Container.Inner>
					<Link
						target="_blank"
						href="https://beian.miit.gov.cn/"
						className="absolute text-blue-600 w-full bottom-6 left-1/2 -translate-x-1/2 flex justify-center items-center"
					>
						<Image
							unoptimized
							src={"/police.png"}
							width={18}
							height={18}
							alt="备案"
							className="mr-1 "
						/>
						浙ICP备2021039023号-3
					</Link>
				</div>
			</Container.Outer>
		</footer>
	);
}
