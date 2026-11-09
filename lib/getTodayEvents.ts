import { HistoricalEvent } from './types';
export async function getTodayEvents(today = new Date()): Promise<HistoricalEvent[]> {
 const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', month: 'numeric', day: 'numeric' }).formatToParts(today);
 const month = parts.find(part => part.type === 'month')!.value;
 const day = parts.find(part => part.type === 'day')!.value;
 const res = await fetch(`https://history.muffinlabs.com/date/${month}/${day}`, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(10000) });
 if (!res.ok) throw new Error('Failed to fetch historical data');
 const data = await res.json();
 return data.data.Events as HistoricalEvent[];
}
