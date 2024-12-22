"use client";
import { ClientOnly } from "@/components/ClientOnly";
import Image from "next/image";
import type React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ZoomAbleImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
}

const ZoomAbleImage: React.FC<ZoomAbleImageProps> = ({
	src,
	alt,
	width,
	height,
}) => {
	return (
		// @ts-ignore
		<ClientOnly>
			<Zoom>
				<Image
					unoptimized
					src={src}
					alt={alt}
					width={width || 800}
					height={height || 600}
					layout="responsive"
				/>
			</Zoom>
		</ClientOnly>
	);
};

export default ZoomAbleImage;
