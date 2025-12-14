'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function GlobalBg() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// 在客户端渲染完成后，将 mounted 设置为 true
	useEffect(() => {
		setMounted(true);
	}, []);

	// 根据主题和 mounted 状态，返回不同的 className
	const isChristmas = theme === 'christmas' && mounted;

	return (
		<div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
			<div
				className={cn(
					'absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]',
					mounted &&
						(theme === 'dark'
							? '[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'
							: '[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'),
					isChristmas && 'hidden'
				)}
			/>

			{isChristmas && (
				<>
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.32),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.22),transparent_42%),linear-gradient(135deg,#1f3d2b_0%,#0f1f16_30%,#1a0f12_70%,#2a0a0f_100%)]" />
					<div className="snow-layer" aria-hidden />
					<div className="absolute inset-x-0 top-0 flex justify-between px-8 pt-10">
						<Image
							src="/christmas/santa.svg"
							alt="Santa"
							width={112}
							height={112}
							className="h-24 w-24 drop-shadow-lg md:h-28 md:w-28"
							priority
						/>
						<Image
							src="/christmas/tree.svg"
							alt="Christmas tree"
							width={96}
							height={128}
							className="h-24 w-20 drop-shadow-lg md:h-28 md:w-24"
							priority
						/>
					</div>
				</>
			)}
		</div>
	);
}
