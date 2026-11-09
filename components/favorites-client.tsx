'use client';

import { useEffect, useState } from 'react';
import { useFavorites } from '@/lib/useFavorites';
import { EventCard } from '@/components/EventCard';

export function FavoritesClient() {
	const { favorites } = useFavorites();
	const [hasMounted, setHasMounted] = useState(false); // 👈 track mount state

	// 👇 Force re-render when localStorage changes
	useEffect(() => {
		setHasMounted(true); // 👈 mark that we're on the client after mount

	}, []);

	// 👇 Don't render anything until we know we're mounted
	if (!hasMounted) return null;

	if (favorites.length === 0) {
		return (
			<p className='text-muted-foreground'>
				{`You haven’t favorited any events yet.`}
			</p>
		);
	}

	return (
		<div className='space-y-4'>
			{favorites.map((event, index) => (
				<EventCard key={index} event={event} />
			))}
		</div>
	);
}
