import Link from 'next/link';
import { getTodayEvents } from '@/lib/getTodayEvents';
import { enrichStory, selectStories } from '@/lib/dailyEdition';
import { DailyEdition } from '@/components/DailyEdition';
export const dynamic = 'force-dynamic';
export default async function HomePage() {
 const now = new Date();
 let stories;
 try { stories = await Promise.all(selectStories(await getTodayEvents(now)).map(enrichStory)); }
 catch { return <main className='edition-shell py-24'><p className='edition-eyebrow'>Daily History</p><h1 className='edition-title'>History can wait a moment.</h1><p className='my-6 text-muted-foreground'>We couldn’t reach today’s sources. Try again shortly, or revisit a saved story.</p><Link href='/favorites' className='underline'>Open your favorites →</Link></main>; }
 const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'America/New_York' });
 const dayKey = now.toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
 return <DailyEdition key={dayKey} stories={stories} date={date} dayKey={dayKey} />;
}
