import { Footer } from "@/components/Footer";
import { GlobalBg } from "@/components/GlobalBg";
import { Header } from "@/components/Header";
import { Suspense } from "react";
// 导入 代码 样式
// import '@/style/prism-coldark-dark.css';
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<GlobalBg />
			{/* 内容区域盒子 */}
			<div className="fixed inset-0 flex justify-center sm:px-8">
				<div className="flex w-full max-w-7xl lg:px-8">
					<div className="opacity-95 w-full bg-zinc-50/90 ring-1 ring-zinc-100 dark:bg-zinc-900/80 dark:ring-zinc-400/20" />
				</div>
			</div>
			<div className="relative text-zinc-800 dark:text-zinc-200">
				<Header />
				<main>{children}</main>
				<Suspense>
					<Footer />
				</Suspense>
			</div>
		</>
	);
}
