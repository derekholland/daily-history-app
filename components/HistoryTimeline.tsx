'use client';

import { useState } from 'react';
import { HistoricalEvent } from '@/lib/types';
import { EventCard } from './EventCard';

interface Props {
	events: HistoricalEvent[];
}

const EVENTS_PER_PAGE = 10;

export function HistoryTimeline({ events }: Props) {
	const [currentPage, setCurrentPage] = useState(1);

	// Calculate total number of pages
	const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

	// Calculate the current slice of events to display
	const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
	const endIndex = startIndex + EVENTS_PER_PAGE;
	const visibleEvents = events.slice(startIndex, endIndex);

	return (
		<div className='space-y-4'>
			{/* Display only current page events */}
			{visibleEvents.map((event, index) => (
				<EventCard key={index} event={event} />
			))}

			{/* Pagination Controls */}
			<div className='mt-6 flex justify-center items-center gap-4'>
				<button
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
					className='px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50'>
					Previous
				</button>

				<span className='text-sm text-muted-foreground'>
					Page {currentPage} of {totalPages}
				</span>

				<button
					disabled={currentPage === totalPages}
					onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
					className='px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50'>
					Next
				</button>
			</div>
		</div>
	);
}
