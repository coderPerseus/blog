import { withContentlayer } from "next-contentlayer";
import generate from "./scripts/generate-rss.js";
/** @type {import('next').NextConfig} */
const nextConfig = {
	// 静态导出
	output: "export",
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["blog-1304565468.cos.ap-shanghai.myqcloud.com", "github.com"],
	},
	webpack: (config, { isServer }) => {
		// if (isServer) {
		// 	require('./scripts/generate-sitemap'); // eslint-disable-line
		// 	require('./scripts/generate-rss'); // eslint-disable-line
		// }
		generate();
		return config;
	},
};

export default withContentlayer(nextConfig);
