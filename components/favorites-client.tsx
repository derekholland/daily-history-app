// components/favorites-client.tsx
'use client';

import { useFavorites } from '@/lib/useFavorites';
import { EventCard } from '@/components/EventCard';

export function FavoritesClient() {
	const { favorites } = useFavorites();

	if (favorites.length === 0) {
		return (
			<p className='text-muted-foreground'>
				You haven't favorited any events yet.
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
