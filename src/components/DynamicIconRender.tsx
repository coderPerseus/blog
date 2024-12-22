"use client";
import * as Icons from "@radix-ui/react-icons";
export default function DynamicIconRender({
	iconKey,
	...props
}: Readonly<{
	iconKey: string;
	style?: React.CSSProperties;
	className?: string;
}>) {
	const IconComponent = Icons[iconKey as keyof typeof Icons];
	return <IconComponent {...props} />;
}
