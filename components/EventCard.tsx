'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HistoricalEvent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/lib/useFavorites';
import { Star, StarOff, ArrowUpRight } from 'lucide-react';

interface Props {
	event: HistoricalEvent;
}

export function EventCard({ event }: Props) {
	const { isFavorited, toggleFavorite } = useFavorites();

	return (
		<Card className='hover:shadow-lg transition-shadow'>
			<CardHeader className='flex justify-between items-start'>
				<CardTitle className='text-xl font-semibold'>{event.year}</CardTitle>

				<Button
					variant='ghost'
					size='icon'
					onClick={() => toggleFavorite(event)}
					aria-label='Toggle Favorite'>
					{isFavorited(event) ? (
						<Star className='text-yellow-500 fill-yellow-500' />
					) : (
						<StarOff />
					)}
				</Button>
			</CardHeader>

			<CardContent className='space-y-2 text-muted-foreground'>
				<p>{event.text}</p>

				{event.links?.[0] && (
					<Button variant='outline' size='sm' asChild className='mt-2'>
						<a
							href={event.links[0].link}
							target='_blank'
							rel='noopener noreferrer'>
							Learn more <ArrowUpRight className='ml-1 w-4 h-4' />
						</a>
					</Button>
				)}
			</CardContent>
		</Card>
	);
}
