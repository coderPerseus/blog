import BaiDuAnalytics from '@/components/BaiDuAnalytics';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import siteMetadata from '@/config/site';
import { constructSiteUrl } from '@/lib';
import { sansFont } from '@/lib/font';
import { Viewport, type Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	metadataBase: new URL(siteMetadata.url),
	title: {
		template: '%s | ' + siteMetadata.authors,
		default: siteMetadata.authorsCN
	},
	description: siteMetadata.description,
	keywords: '%s,' + siteMetadata.keywords.join(','),
	manifest: '/site.webmanifest',
	openGraph: siteMetadata.openGraph,
	twitter: siteMetadata.twitter,
	alternates: {
		canonical: constructSiteUrl('/'),
		types: {
			'application/rss+xml': [{ url: 'rss', title: 'RSS 订阅' }]
		}
	},
	other: {
		'baidu-site-verification': 'codeva-7AmpPWgzQY',
		'google-site-verification': 'TTbfOvWmLj0icfk0BQNUZB3crwReji82Q_vRdnZFFAc'
	}
};
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: siteMetadata.themeColors
};
export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// <ViewTransitions>
		<html
			className={`${sansFont.variable} m-0 h-full p-0 font-sans antialiased`}
			lang={siteMetadata.locale}
			suppressHydrationWarning
		>
			<body className={inter.className}>
				<GoogleAnalytics />
				<BaiDuAnalytics />
				{/* @ts-ignore */}
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
		// </ViewTransitions>
	);
}

export const dynamic = 'error';
