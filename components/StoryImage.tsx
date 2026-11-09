'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
	src?: string | null;
	alt: string;
	year: string;
	sizes: string;
	priority?: boolean;
}

export function StoryImage({ src, alt, year, sizes, priority = false }: Props) {
	const [failedSrc, setFailedSrc] = useState<string | null>(null);
	const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
	const showImage = Boolean(src && failedSrc !== src);

	return (
		<>
			{/* Keep artwork beneath the photo while it loads and if it fails. */}
			<div className='edition-year-art absolute inset-0' style={{ minHeight: 0 }} aria-hidden='true'>
				<span>ON THIS DAY</span>
				<strong>{year}</strong>
			</div>
			{showImage && src && (
				<Image
					key={src}
					src={src}
					alt={alt}
					fill
					sizes={sizes}
					priority={priority}
					className={`object-cover ${loadedSrc === src ? 'opacity-100' : 'opacity-0'}`}
					onLoad={() => setLoadedSrc(src)}
					onError={() => setFailedSrc(src)}
				/>
			)}
		</>
	);
}
