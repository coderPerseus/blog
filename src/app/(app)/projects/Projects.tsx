import codeCopyIcon from '@/assets/products/codecopy.png';
import resumeIcon from '@/assets/products/resume.png';
import React from 'react';
import easykolIcon from '~/public/easykol.png';
import luckySnailBlogIcon from '~/public/logo.png';
import neovateCodeIcon from '~/public/neovateCode.png';
import npmIcon from '~/public/npmIcon.webp';
import svgShowIcon from '~/public/svgShow.png';
import { ProjectCard } from './ProjectCard';

export function Projects(): React.ReactElement {
	const projects: ProjectItem[] = [
		{
			id: '8',
			url: 'https://easykol.com/',
			icon: easykolIcon,
			name: 'Easykol',
			description:
				'最好用的海外营销工具，帮你快速找到你想要的红人，并且内置邮件模板和批量发邮件建联。支持 Tiktok，instagram，youtube，小红书，抖音等主流平台，无论性价比还是质量都遥遥领先行业内竞品产品',
			tags: ['公司']
		},
		{
			id: '7',
			url: 'https://neovateai.dev/',
			icon: neovateCodeIcon,
			name: 'Neovate Code',
			description: `Neovate ['niːəʊveɪt] Code is a code agent to enhance your development. You can use it to generate code, fix bugs, review code, add tests, and more. You can run it in interactive mode or headless mode.`,
			tags: ['开源']
		},
		{
			id: '6',
			url: 'https://www.svgshow.cn/',
			icon: svgShowIcon,
			name: 'SVG 秀',
			description:
				'利用当下最强的 SVG 动画库，轻松将内容转为美观的 SVG 图片，并且可以看到 AI 是如何一步步画出来的',
			tags: ['个人']
		},
		{
			id: '5',
			url: 'https://ascii.luckysnail.cn/',
			icon: luckySnailBlogIcon,
			name: 'ASCII 字符生成器',
			description: '把图片和视频转为 ASCII 形式',
			tags: ['个人']
		},
		{
			id: '4',
			url: 'https://www.npmjs.com/package/bytemd-plugin-image-lazy',
			icon: npmIcon,
			name: 'bytemd 的图片懒加载插件',
			description: '支持原生懒加载和 intersection observer 懒加载',
			tags: ['个人']
		},
		{
			id: '3',
			url: 'https://www.luckySnail.cn',
			icon: luckySnailBlogIcon,
			name: 'luckySnail 的个人博客',
			description: '基于 Next.js 创建的博客网站，',
			tags: ['个人']
		},
		{
			id: '2',
			url: 'https://www.laoyujianli.com',
			icon: resumeIcon,
			name: '老鱼简历',
			description:
				'很好用的写简历平台，能够下载 PDF PNG 格式的简历，当然也可以分享在线简历链接，支持各种格式文件导入简历，接入了 AI 帮忙快速写简历，还能看到一些实时的求职动态。可以体验一下，如果使用有任何问题，欢迎 联系我',
			tags: ['公司']
		},
		{
			id: '1',
			url: 'https://www.codecopy.cn',
			icon: codeCopyIcon,
			name: '代码小抄',
			description: '一个方便的代码片段记录工具',
			tags: ['公司']
		}
	];

	return (
		<ul
			role="list"
			className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
		>
			{projects.map((project) => (
				<ProjectCard project={project} key={project.id} />
			))}
		</ul>
	);
}
