import { getTodayEvents } from '@/lib/getTodayEvents';
import { getThumbnail } from '@/lib/getThumbnail';
import { HistoryTimeline } from '@/components/HistoryTimeline';
// import { RevalidateOnVisit } from '@/components/RevalidateOnVisit';
import { RevalidateOnDayChange } from '@/components/RevalidateOnDayChange';

<RevalidateOnDayChange />;

// Incremental Static Regeneration (ISR) allows us to revalidate the page data
// at a specified interval. Here, we set it to revalidate once per day (86400 seconds).
// This means the page will be regenerated in the background after 24 hours,
// ensuring that users see fresh data without needing to rebuild the entire site.
// export const revalidate = 86400; // revalidate once per day

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
			{/* <RevalidateOnVisit /> */}
			<h1 className='text-3xl font-bold flex flex-col gap-1'>
				<span>📅 This Day in History</span>
				<span className='text-muted-foreground text-lg'>{today}</span>
			</h1>

			<HistoryTimeline events={eventsWithImages} />
		</main>
	);
}
