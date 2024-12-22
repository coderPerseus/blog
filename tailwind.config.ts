import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		transparent: "transparent",
		current: "currentColor",
		fontSize: {
			xs: ["0.8125rem", { lineHeight: "1.5rem" }],
			sm: ["0.875rem", { lineHeight: "1.5rem" }],
			base: ["1rem", { lineHeight: "1.75rem" }],
			lg: ["1.125rem", { lineHeight: "1.75rem" }],
			xl: ["1.25rem", { lineHeight: "2rem" }],
			"2xl": ["1.5rem", { lineHeight: "2rem" }],
			"3xl": ["1.875rem", { lineHeight: "2.25rem" }],
			"4xl": ["2rem", { lineHeight: "2.5rem" }],
			"5xl": ["3rem", { lineHeight: "3.5rem" }],
			"6xl": ["3.75rem", { lineHeight: "1" }],
			"7xl": ["4.5rem", { lineHeight: "1" }],
			"8xl": ["6rem", { lineHeight: "1" }],
			"9xl": ["8rem", { lineHeight: "1" }],
		},
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		typography: (theme: AnyIfEmpty) => ({
			invert: {
				css: {
					"--tw-prose-body": "var(--tw-prose-invert-body)",
					"--tw-prose-headings": "var(--tw-prose-invert-headings)",
					"--tw-prose-links": "var(--tw-prose-invert-links)",
					"--tw-prose-links-hover": "var(--tw-prose-invert-links-hover)",
					"--tw-prose-underline": "var(--tw-prose-invert-underline)",
					"--tw-prose-underline-hover":
						"var(--tw-prose-invert-underline-hover)",
					"--tw-prose-bold": "var(--tw-prose-invert-bold)",
					"--tw-prose-counters": "var(--tw-prose-invert-counters)",
					"--tw-prose-bullets": "var(--tw-prose-invert-bullets)",
					"--tw-prose-hr": "var(--tw-prose-invert-hr)",
					"--tw-prose-quote-borders": "var(--tw-prose-invert-quote-borders)",
					"--tw-prose-captions": "var(--tw-prose-invert-captions)",
					"--tw-prose-th-borders": "var(--tw-prose-invert-th-borders)",
					"--tw-prose-td-borders": "var(--tw-prose-invert-td-borders)",
				},
			},
			DEFAULT: {
				css: {
					"--tw-prose-links": theme("colors.purple.500"),
					"--tw-prose-links-hover": theme("colors.purple.600"),
					"--tw-prose-underline": theme("colors.purple.500 / 0.2"),
					"--tw-prose-underline-hover": theme("colors.purple.500"),
					"--tw-prose-invert-links": theme("colors.purple.400"),
					"--tw-prose-invert-links-hover": theme("colors.purple.400"),
					"--tw-prose-invert-underline": theme("colors.purple.400 / 0.3"),
					"--tw-prose-invert-underline-hover": theme("colors.purple.400"),

					// Base
					color: "var(--tw-prose-body)",
					lineHeight: theme("lineHeight.7"),
					"> *": {
						marginTop: theme("spacing.10"),
						marginBottom: theme("spacing.10"),
					},
					code: {
						backgroundColor: theme("colors.gray.100"),
						color: theme("colors.red.500"),
						padding: theme("spacing.1"),
						borderRadius: theme("borderRadius.sm"),
						fontWeight: theme("fontWeight.medium"),
						wordBreak: "break-all",
					},
					"code::before": {
						content: '""',
					},
					"code::after": {
						content: '""',
					},
					pre: {
						backgroundColor: theme("colors.gray.900"),
						color: theme("colors.white"),
						padding: theme("spacing.4"),
						borderRadius: theme("borderRadius.md"),
						overflowX: "auto",
					},
					"pre code": {
						backgroundColor: "transparent",
						padding: 0,
						color: "inherit",
						fontWeight: "inherit",
					},
					p: {
						marginTop: theme("spacing.4"),
						marginBottom: theme("spacing.4"),
					},
					h1: {
						fontSize: theme("fontSize.2xl")[0],
						fontWeight: "700",
						marginTop: theme("spacing.4"),
						marginBottom: theme("spacing.4"),
						letterSpacing: theme("letterSpacing.tight"),
					},
					// Headings
					"h2, h3": {
						color: "var(--tw-prose-headings)",
						fontWeight: theme("fontWeight.semibold"),
					},
					h2: {
						fontSize: theme("fontSize.xl")[0],
						lineHeight: theme("lineHeight.7"),
						marginTop: theme("spacing.4"),
						marginBottom: theme("spacing.4"),
					},
					h3: {
						fontSize: theme("fontSize.base")[0],
						lineHeight: theme("lineHeight.7"),
						marginTop: theme("spacing.2"),
						marginBottom: theme("spacing.4"),
					},
					":is(h2, h3) + *": {
						marginTop: 0,
					},

					// Inline elements
					a: {
						wordBreak: "break-word",
						color: "var(--tw-prose-links)",
						fontWeight: theme("fontWeight.semibold"),
						textDecoration: "underline",
						textDecorationColor: "var(--tw-prose-underline)",
						transitionProperty: "color, text-decoration-color",
						transitionDuration: theme("transitionDuration.150"),
						transitionTimingFunction: theme("transitionTimingFunction.in-out"),
					},
					"a:hover": {
						color: "var(--tw-prose-links-hover)",
						textDecorationColor: "var(--tw-prose-underline-hover)",
					},
					strong: {
						color: "var(--tw-prose-bold)",
						fontWeight: theme("fontWeight.semibold"),
					},
					"a code": {
						color: "inherit",
					},
					":is(h2, h3) code": {
						fontWeight: theme("fontWeight.bold"),
					},

					// Quotes
					blockquote: {
						borderLeft: "4px solid #8b5cf6", // 紫色边框
						backgroundColor: "#f5f3ff", // 浅紫色背景
						padding: "1rem 1.5rem",
						margin: "1.5rem 0",
						borderRadius: "0.375rem", // 圆角
						boxShadow:
							"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", // 轻微阴影
						fontStyle: "italic",
						color: "#4c1d95", // 深紫色文字
						"& p:first-of-type::before": {
							content: '"\u201C"', // 左引号
							fontSize: "2em",
							lineHeight: "0.1em",
							marginRight: "0.25em",
							verticalAlign: "-0.4em",
							color: "#8b5cf6", // 紫色引号
						},
						"& p:last-of-type::after": {
							content: '"\u201D"', // 右引号
							fontSize: "2em",
							lineHeight: "0.1em",
							marginLeft: "0.25em",
							verticalAlign: "-0.4em",
							color: "#8b5cf6", // 紫色引号
						},
					},
					// Figures
					figcaption: {
						color: "var(--tw-prose-captions)",
						fontSize: theme("fontSize.sm")[0],
						lineHeight: theme("lineHeight.6"),
						marginTop: theme("spacing.3"),
					},
					"figcaption > p": {
						margin: 0,
					},

					// Lists
					ul: {
						listStyleType: "disc",
					},
					ol: {
						listStyleType: "decimal",
					},
					"ul, ol": {
						paddingLeft: theme("spacing.4"),
					},
					li: {
						marginTop: theme("spacing.4"),
						marginBottom: theme("spacing.4"),
						paddingLeft: theme("spacing[3.5]"),
					},
					"li::marker": {
						fontSize: theme("fontSize.sm")[0],
						fontWeight: theme("fontWeight.semibold"),
					},
					"ol > li::marker": {
						color: "var(--tw-prose-counters)",
					},
					"ul > li::marker": {
						color: "var(--tw-prose-bullets)",
					},
					"li :is(ol, ul)": {
						marginTop: theme("spacing.4"),
						marginBottom: theme("spacing.4"),
					},
					"li :is(li, p)": {
						marginTop: theme("spacing.3"),
						marginBottom: theme("spacing.3"),
					},

					// Code blocks

					// Horizontal rules
					hr: {
						marginTop: theme("spacing.10"),
						marginBottom: theme("spacing.10"),
						borderTopWidth: "1px",
						borderColor: "var(--tw-prose-hr)",
						"@screen lg": {
							marginLeft: `calc(${theme("spacing.12")} * -1)`,
							marginRight: `calc(${theme("spacing.12")} * -1)`,
						},
					},

					// Tables
					table: {
						width: "100%",
						tableLayout: "auto",
						textAlign: "left",
						fontSize: theme("fontSize.sm")[0],
					},
					thead: {
						borderBottomWidth: "1px",
						borderBottomColor: "var(--tw-prose-th-borders)",
					},
					"thead th": {
						color: "var(--tw-prose-headings)",
						fontWeight: theme("fontWeight.semibold"),
						verticalAlign: "bottom",
						paddingBottom: theme("spacing.2"),
					},
					"thead th:not(:first-child)": {
						paddingLeft: theme("spacing.2"),
					},
					"thead th:not(:last-child)": {
						paddingRight: theme("spacing.2"),
					},
					"tbody tr": {
						borderBottomWidth: "1px",
						borderBottomColor: "var(--tw-prose-td-borders)",
					},
					"tbody tr:last-child": {
						borderBottomWidth: 0,
					},
					"tbody td": {
						verticalAlign: "baseline",
					},
					tfoot: {
						borderTopWidth: "1px",
						borderTopColor: "var(--tw-prose-th-borders)",
					},
					"tfoot td": {
						verticalAlign: "top",
					},
					":is(tbody, tfoot) td": {
						paddingTop: theme("spacing.2"),
						paddingBottom: theme("spacing.2"),
					},
					":is(tbody, tfoot) td:not(:first-child)": {
						paddingLeft: theme("spacing.2"),
					},
					":is(tbody, tfoot) td:not(:last-child)": {
						paddingRight: theme("spacing.2"),
					},
				},
			},
		}),
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
		},
	},

	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
	],
} satisfies Config;

export default config;
