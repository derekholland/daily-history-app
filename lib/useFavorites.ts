import { useState, useEffect } from 'react';
import { HistoricalEvent } from './types';
import { getFavorites, toggleFavorite as toggle } from './localStorage';

export function useFavorites() {
	const [favorites, setFavorites] = useState<HistoricalEvent[]>([]);

	useEffect(() => {
		setFavorites(getFavorites());
		const sync = () => setFavorites(getFavorites());
		window.addEventListener('history-favorites-changed', sync);
		window.addEventListener('storage', sync);
		return () => {
			window.removeEventListener('history-favorites-changed', sync);
			window.removeEventListener('storage', sync);
		};
	}, []);

	const isFavorited = (event: HistoricalEvent) =>
		favorites.some(e => e.text === event.text && e.year === event.year);

	const toggleFavorite = (event: HistoricalEvent) => {
		const updated = toggle(event);
		setFavorites(updated);
	};

	return { favorites, isFavorited, toggleFavorite };
}
