import { Container } from "@/components/Container";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

export const generateMetadata = () => {
	const post = allPosts.find((post) => post.slug === "about");
	if (!post) throw new Error("Post not found for ");
	const title = post.title;
	const description = post.description;
	return {
		title,
		description,
		openGraph: {
			title,
			description,
		},
		twitter: {
			title,
			description,
			card: "summary_large_image",
		},
	};
};

const AboutPage = () => {
	const post = allPosts.find((post) => post.slug === "about");
	if (!post) notFound();
	const MDXContent = useMDXComponent(post.body.code);

	return (
		<Container className="mt-16">
			<article className="rich-text-viewer prose ">
				<div className="mb-8 ">
					<h1 className="text-3xl font-bold">{post.title}</h1>
				</div>
				<MDXContent />
			</article>
		</Container>
	);
};

export default AboutPage;
