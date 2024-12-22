import { constructSiteUrl } from "@/lib";
import { allPosts } from "contentlayer/generated";
import type { MetadataRoute } from "next";

export function generateStaticParams() {
	return [{ __metadata_id__: [] }];
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticMap = [
		{
			url: constructSiteUrl("/").href,
			lastModified: new Date(),
		},
		{
			url: constructSiteUrl("/posts").href,
			lastModified: new Date(),
		},
		{
			url: constructSiteUrl("/projects").href,
			lastModified: new Date(),
		},
		{
			url: constructSiteUrl("/about").href,
			lastModified: new Date(),
		},
	] satisfies MetadataRoute.Sitemap;

	const slugs = allPosts
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		})
		.slice(0, allPosts.length - 1);

	const dynamicMap = slugs.map((slug) => ({
		url: constructSiteUrl(`/posts/${slug.slug}`).href,
		lastModified: new Date(),
	})) satisfies MetadataRoute.Sitemap;

	return [...staticMap, ...dynamicMap];
}
