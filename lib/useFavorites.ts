// lib/useFavorites.ts
import { useEffect, useState } from 'react';
import { HistoricalEvent } from '@/types';

const STORAGE_KEY = 'history-favorites';

export function useFavorites() {
	const [favorites, setFavorites] = useState<HistoricalEvent[]>([]);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			setFavorites(JSON.parse(stored));
		}
	}, []);

	const isFavorited = (event: HistoricalEvent) =>
		favorites.some(e => e.text === event.text && e.year === event.year);

	const toggleFavorite = (event: HistoricalEvent) => {
		const exists = isFavorited(event);
		const updated = exists
			? favorites.filter(e => e.text !== event.text || e.year !== event.year)
			: [...favorites, event];

		setFavorites(updated);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
	};

	return { favorites, isFavorited, toggleFavorite };
}
