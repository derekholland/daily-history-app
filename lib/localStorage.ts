import { HistoricalEvent } from './types';

const STORAGE_KEY = 'history-favorites';

export const getFavorites = (): HistoricalEvent[] => {
	if (typeof window !== 'undefined') {
		const favorites = localStorage.getItem(STORAGE_KEY);
		return favorites ? JSON.parse(favorites) : [];
	}
	return [];
};

export const setFavorites = (favorites: HistoricalEvent[]) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
	}
};

export const toggleFavorite = (event: HistoricalEvent): HistoricalEvent[] => {
	const current = getFavorites();
	const exists = current.some(
		e => e.text === event.text && e.year === event.year
	);
	const updated = exists
		? current.filter(e => e.text !== event.text || e.year !== event.year)
		: [...current, event];

	setFavorites(updated);
	return updated;
};
