import { getTodayEvents } from '@/lib/getTodayEvents';
import { getThumbnail } from '@/lib/getThumbnail';
import { HistoryTimeline } from '@/components/HistoryTimeline';

export default async function HomePage() {
	function formatToday() {
		const now = new Date();
		return now.toLocaleDateString(undefined, {
			month: 'long',
			day: 'numeric'
		});
	}

	const events = await getTodayEvents();
	const today = formatToday();

	// ✅ Map events with thumbnail images
	const eventsWithImages = await Promise.all(
		events.map(async event => {
			const firstLink = event.links?.[0];
			let imageUrl = null;

			if (firstLink?.title) {
				imageUrl = await getThumbnail(firstLink.title);
			}

			return {
				...event,
				imageUrl
			};
		})
	);

	return (
		<main className='max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6'>
			<h1 className='text-3xl font-bold flex flex-col gap-1'>
				<span>📅 This Day in History</span>
				<span className='text-muted-foreground text-lg'>{today}</span>
			</h1>

			{/* <div className='space-y-4'>
				{eventsWithImages.map((event, idx) => (
					<EventCard key={idx} event={event} imageUrl={event.imageUrl} />
				))}
			</div> */}
			<HistoryTimeline events={eventsWithImages} />
		</main>
	);
}
