// 'use client';
import { useEffect } from "react";
import { flushSync } from "react-dom";

export default function useThemeToggleAnimation({
	isDarkMode,
	domRef,
	onThemeChange,
}: {
	domRef: React.RefObject<HTMLElement>;
	isDarkMode: boolean;
	onThemeChange: (theme: string) => void;
}) {
	const toggleDarkMode = async () => {
		if (!domRef.current || !document) return;
		// @ts-ignore
		await document.startViewTransition(() => {
			flushSync(() => {
				onThemeChange(isDarkMode ? "light" : "dark");
			});
		}).ready;

		document.documentElement.animate(
			{
				opacity: [0, 1],
			},
			{
				duration: 500,
				easing: "ease-in-out",
				pseudoElement: "::view-transition-new(root)",
			},
		);
	};

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);
	return { toggleDarkMode };
}
