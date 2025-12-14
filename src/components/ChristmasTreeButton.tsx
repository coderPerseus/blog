'use client';

import { cn } from '@/lib/utils';
import { TreePine } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';

function isWithinChristmasWindow(date: Date) {
	const month = date.getMonth();
	const day = date.getDate();

	// Show from November 25 (one month before Christmas) until December 28 (3 days after)
	return (month === 10 && day >= 25) || (month === 11 && day <= 28);
}

export default function ChristmasTreeButton() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [shouldShow, setShouldShow] = useState(false);

	useEffect(() => {
		setMounted(true);
		setShouldShow(isWithinChristmasWindow(new Date()));
	}, []);

	const isChristmasTheme = useMemo(() => theme === 'christmas', [theme]);

	if (!mounted || !shouldShow) return null;

	return (
		<button
			type="button"
			aria-label="开启圣诞节主题"
			className={cn(
				'relative inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-white shadow-lg shadow-red-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
				'bg-gradient-to-r from-emerald-500 via-red-500 to-amber-400 hover:scale-[1.02] hover:shadow-red-500/50 focus:ring-red-300 dark:focus:ring-red-700',
				isChristmasTheme && 'ring-2 ring-offset-2 ring-white/70'
			)}
			onClick={() => setTheme('christmas')}
		>
			<span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-lg">
				🎄
			</span>
			<span className="mr-1 hidden sm:inline">提前感受圣诞</span>
			<TreePine className="h-5 w-5" />
			<span
				aria-hidden
				className="pointer-events-none absolute inset-[-2px] rounded-full border border-white/40 bg-gradient-radial from-white/30 via-transparent to-transparent opacity-80"
			/>
		</button>
	);
}
