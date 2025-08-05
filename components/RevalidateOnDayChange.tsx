'use client';

import { useEffect } from 'react';

export function RevalidateOnDayChange() {
	useEffect(() => {
		const lastVisit = localStorage.getItem('last-visit');
		const today = new Date().toDateString();

		if (lastVisit !== today) {
			localStorage.setItem('last-visit', today);

			// Trigger server-side revalidation
			fetch('/api/revalidate', { method: 'POST' });
		}
	}, []);

	return null;
}
