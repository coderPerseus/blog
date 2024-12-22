"use client";

import NotFound from "@/assets/unDraw/404.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
	return (
		<main className="h-screen">
			<div className="absolute inset-0 h-full w-full">
				{/* <Spline scene={constructSiteUrl('macbook.splinecode').href} /> */}
			</div>

			<div className="pointer-events-none absolute inset-0 flex h-full w-full flex-col items-center justify-center">
				<motion.h1
					className="mb-10 flex flex-col justify-center items-center pointer-events-none select-none text-3xl font-bold text-black dark:text-white "
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.3 }}
				>
					<Image
						src={NotFound}
						alt="404 | luckySnail"
						unoptimized
						width={320}
						className="mb-12"
					/>
					<span className="text-violet-500 dark:text-violet-300">
						来到了未知的位置
					</span>
				</motion.h1>
				<Link
					href="/"
					className="pointer-events-auto select-none text-xl font-bold text-white mix-blend-difference hover:underline"
				>
					返回主页
				</Link>
			</div>
		</main>
	);
}
