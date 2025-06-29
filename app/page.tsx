import { getTodayEvents } from '@/lib/getTodayEvents';
import { HistoryTimeline } from '@/components/HistoryTimeline';
import { Navbar } from '@/components/Navbar';

export default async function HomePage() {
	const events = await getTodayEvents();

	return (
		<main className='max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6'>
			<h1 className='text-3xl font-bold flex items-center gap-2'>
				📅 This Day in History
			</h1>

			<HistoryTimeline events={events} />
		</main>
	);
}
