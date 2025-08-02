'use client';

import { useEffect } from 'react';

export function RevalidateOnVisit() {
	useEffect(() => {
		const lastRefresh = localStorage.getItem('last-refresh');
		const now = Date.now();
		const oneDay = 1000 * 60 * 60 * 24;

		if (!lastRefresh || now - parseInt(lastRefresh, 10) > oneDay) {
			// Call the server action to revalidate
			fetch('/api/revalidate-home', { method: 'POST' });
			localStorage.setItem('last-refresh', now.toString());
		}
	}, []);

	return null;
}
