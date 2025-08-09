// 'use client';

// import { useEffect } from 'react';

// export function RevalidateOnDayChange() {
// 	useEffect(() => {
// 		const lastVisit = localStorage.getItem('last-visit');
// 		const today = new Date().toDateString();

// 		if (lastVisit !== today) {
// 			localStorage.setItem('last-visit', today);

// 			// Trigger server-side revalidation
// 			fetch('/api/revalidate', { method: 'POST' });
// 		}
// 	}, []);

// 	return null;
// }

// Time Zone fix for revalidation
'use client';

import { useEffect } from 'react';

export function RevalidateOnDayChange() {
	useEffect(() => {
		// Get the user's *local* date parts to avoid UTC rollover
		const todayLocal = new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});

		const lastVisit = localStorage.getItem('last-visit');

		if (lastVisit !== todayLocal) {
			localStorage.setItem('last-visit', todayLocal);
			fetch('/api/revalidate', { method: 'POST' });
		}
	}, []);

	return null;
}
