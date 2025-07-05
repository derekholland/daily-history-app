'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HistoricalEvent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Star, StarOff, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useFavorites } from '@/lib/useFavorites';

interface Props {
	event: HistoricalEvent;
}

export function EventCard({ event }: Props) {
	const { isFavorited, toggleFavorite } = useFavorites();

	const handleClick = () => {
		const wasFavorited = isFavorited(event); // check BEFORE toggling
		toggleFavorite(event);

		if (wasFavorited && window.location.pathname.includes('favorites')) {
			window.location.reload();
		}
	};

	return (
		<Card className='hover:shadow-lg transition-shadow text-center'>
			<CardHeader className='flex justify-between items-start pb-0'>
				<CardTitle className='text-xl font-semibold'>{event.year}</CardTitle>
				<Button
					variant='ghost'
					size='icon'
					onClick={handleClick}
					aria-label='Toggle Favorite'>
					{isFavorited(event) ? (
						<Star className='text-yellow-500 fill-yellow-500' />
					) : (
						<StarOff />
					)}
				</Button>
			</CardHeader>

			<CardContent className='pt-2 text-muted-foreground'>
				<p className='text-center'>{event.text}</p>
			</CardContent>

			{event.imageUrl && (
				<div className='w-full flex justify-center p-4'>
					<div className='relative w-full max-w-sm aspect-[4/3] rounded-md overflow-hidden'>
						<Image
							src={event.imageUrl}
							alt={event.text}
							fill
							className='object-cover'
							sizes='(max-width: 640px) 100vw, 400px'
						/>
					</div>
				</div>
			)}

			<CardContent className='pt-0 flex justify-center'>
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
