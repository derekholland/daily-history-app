// components/EventCard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HistoricalEvent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Star, StarOff } from 'lucide-react';

interface Props {
	event: HistoricalEvent;
}

export function EventCard({ event }: Props) {
	return (
		<Card className='hover:shadow-lg transition-shadow'>
			<CardHeader>
				<CardTitle className='text-xl font-semibold'>{event.year}</CardTitle>
			</CardHeader>
			<CardContent className='space-y-2 text-muted-foreground'>
				<p>{event.text}</p>
				{event.links?.[0] && (
					<a
						href={event.links[0].link}
						target='_blank'
						rel='noopener noreferrer'
						className='text-sm text-blue-600 hover:underline'>
						Learn more ↗
					</a>
				)}
			</CardContent>
		</Card>
	);
}
