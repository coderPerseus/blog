'use client';

import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	useEffect(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href =
			theme === 'dark'
				? '/style/prism-gruvbox-light.css'
				: '/style/prism-coldark-dark.css';
		document.head.appendChild(link);

		// 清理函数，在组件卸载或主题变化时移除之前的 CSS
		return () => {
			document.head.removeChild(link);
		};
	}, [theme]);
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className="flex items-center space-x-2">
			<Switch
				checked={theme === 'dark'}
				onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				className="w-16 h-8 px-1"
			>
				<motion.div
					// className=" rounded-full shadow-lg"
					layout
					transition={spring}
				>
					{theme === 'dark' ? (
						<Moon className="h-5 w-5 ml-[2px] text-violet-400" />
					) : (
						<Sun className="h-5 w-5 text-violet-500" />
					)}
				</motion.div>
			</Switch>
		</div>
	);
}

const spring = {
	type: 'spring',
	stiffness: 800,
	damping: 60
};
