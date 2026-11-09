'use client';
import { useEffect, useState } from 'react';
import { StoryImage } from './StoryImage';
import { useRouter } from 'next/navigation';
import { Bookmark, Sparkles } from 'lucide-react';
import type { EditionStory } from '@/lib/dailyEdition';
import { useFavorites } from '@/lib/useFavorites';
import { Button } from './ui/button';

function Context({ story }: { story: EditionStory }) {
	return <div className='space-y-5 mt-6'>{story.context && <div><p className='edition-eyebrow mb-2'>The wider context · {story.contextTitle}</p><p className='text-muted-foreground leading-relaxed'>{story.context}</p><a href={story.contextUrl} target='_blank' rel='noopener noreferrer' className='text-xs underline text-muted-foreground'>Wikipedia · CC BY-SA</a></div>}<div className='edition-lens'><p className='edition-eyebrow mb-2'>Think about the impact</p><p className='font-serif text-xl'>{story.lens}</p></div>{story.links?.[0] && <a className='inline-block text-sm underline underline-offset-4' href={story.contextUrl ?? story.links[0].link} target='_blank' rel='noopener noreferrer'>Read the source ↗</a>}</div>;
}
function Story({ story, featured = false }: { story: EditionStory; featured?: boolean }) {
	const { isFavorited, toggleFavorite } = useFavorites();
	return <article className={featured ? 'edition-feature' : 'edition-secondary'}>
		{featured && <div className='edition-art'><StoryImage src={story.imageUrl} alt={`Illustration related to ${story.contextTitle ?? story.topic}`} year={story.year} sizes='(max-width: 768px) 100vw, 550px' priority /><span className='edition-art-label'>THE LEAD STORY · {story.year}</span></div>}
		<div className={featured ? 'edition-story-body' : ''}><div className='flex items-center justify-between gap-3'><p className='edition-eyebrow'>{story.topic} / {story.year}</p><Button variant='ghost' size='icon' aria-label={isFavorited(story) ? 'Remove saved story' : 'Save story'} aria-pressed={isFavorited(story)} onClick={() => toggleFavorite(story)}><Bookmark className={isFavorited(story) ? 'fill-current' : ''} /></Button></div><h2 className={featured ? 'edition-headline' : 'edition-small-headline'}>{story.text}</h2>{featured ? <Context story={story} /> : <details className='edition-details'><summary>Explore the story</summary><Context story={story} /></details>}</div>
	</article>;
}
export function DailyEdition({ stories, date, dayKey }: { stories: EditionStory[]; date: string; dayKey: string }) {
	const [answer, setAnswer] = useState('');
	const [revealed, setRevealed] = useState(false);
	const router = useRouter();
	useEffect(() => {
		const refresh = () => { if (new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' }) !== dayKey) router.refresh(); };
		const timer = window.setInterval(refresh, 60000);
		window.addEventListener('focus', refresh);
		return () => { clearInterval(timer); window.removeEventListener('focus', refresh); };
	}, [dayKey, router]);
	const lead = stories[0];
	return <main className='edition-shell'><header className='edition-intro'><div className='flex flex-wrap justify-between gap-3 edition-eyebrow'><span>{date} · The daily edition</span><span>{stories.length} stories · A little history, every day</span></div><h1 className='edition-title'>The past has a story.<br /><em>Make time for it.</em></h1><p className='max-w-xl text-muted-foreground text-lg leading-relaxed'>Big moments. The world around them. Something to remember long after today.</p></header>
		{lead ? <><Story story={lead} featured />{stories.length > 1 && <section className='mt-14'><h2 className='edition-eyebrow mb-7'>Also on this day</h2><div className='edition-supporting'>{stories.slice(1).map(story => <Story key={`${story.year}:${story.text}`} story={story} />)}</div></section>}<section className='edition-recall' aria-labelledby='recall-title'><Sparkles size={24} /><div><p className='edition-eyebrow'>Before you go</p><h2 id='recall-title' className='font-serif text-3xl mt-2 mb-4'>Make it stick.</h2><p className='text-muted-foreground mb-4'>Without looking back, in what year did today’s lead event happen?</p><form onSubmit={event => { event.preventDefault(); setRevealed(true); }} className='flex flex-wrap gap-3'><label className='sr-only' htmlFor='recall-year'>Your guess for the year</label><input id='recall-year' value={answer} onChange={event => setAnswer(event.target.value)} placeholder='Your guess…' className='rounded-lg border bg-background px-4 py-2 w-40' /><Button type='submit'>Reveal the answer</Button></form>{revealed && <div role='status' className='mt-5'><p className='font-medium'>{answer.trim() === lead.year ? 'You remembered it!' : 'One to remember:'} {lead.year}.</p><p className='mt-2 text-muted-foreground'>{lead.text}</p><p className='mt-3 text-sm'>You’ve finished today’s edition. Come back tomorrow for another piece of the story.</p></div>}</div></section></> : <div className='py-16'><h2 className='font-serif text-3xl'>A quieter day in the archive.</h2><p className='text-muted-foreground mt-3'>No events met our selection threshold today. Revisit your favorites, or return tomorrow.</p></div>}
		<footer className='edition-footer'><p>How we choose: an automatic shortlist prioritizes independence, rights, major conflicts, and scientific milestones. Up to three events; no filler.</p><p>Selection is a starting point, not a definitive ranking of history. Events: <a href='https://history.muffinlabs.com/' className='underline'>Muffinlabs</a>. Context: Wikipedia. Edition date: Eastern Time.</p></footer></main>;
}
