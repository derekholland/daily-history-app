'use client';

import { useState } from 'react';
import { EventCard } from './EventCard';
import { HistoricalEvent } from '@/lib/types';

interface Props {
	events: HistoricalEvent[];
}

export function HistoryTimeline({ events }: Props) {
	const [showAll, setShowAll] = useState(false);
	const visible = showAll ? events : events.slice(0, 10);

	return (
		<div className='space-y-4'>
			{visible.map((event, index) => (
				<EventCard key={index} event={event} />
			))}

			{events.length > 10 && (
				<button
					onClick={() => setShowAll(!showAll)}
					className='mt-4 text-sm font-medium text-blue-600 hover:underline'>
					{showAll ? 'Show Less' : 'Show More'}
				</button>
			)}
		</div>
	);
}
