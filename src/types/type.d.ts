// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type AnyIfEmpty = any;

interface ProjectItem {
	id?: string;
	name?: string;
	url?: string;
	description?: string;
	icon?: StaticImageData;
	tags?: string[];
}
