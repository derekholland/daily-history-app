// lib/getTodayEvents.ts

import { HistoricalEvent } from './types';

export async function getTodayEvents(): Promise<HistoricalEvent[]> {
	const today = new Date();
	const month = today.getMonth() + 1;
	const day = today.getDate();

	const res = await fetch(
		`https://history.muffinlabs.com/date/${month}/${day}`
	);
	if (!res.ok) {
		throw new Error('Failed to fetch historical data');
	}

	const data = await res.json();
	return data.data.Events as HistoricalEvent[];
}
