import { HistoricalEvent } from './types';

const themes = [
	{ topic: 'Power & society', pattern: /\b(independence|constitution|revolution|civil rights|abolition|slavery|suffrage|magna carta|berlin wall|apartheid|emancipation|united nations|declaration of|martin luther king|rosa parks)\b/i, lens: 'Who gained power or freedom, and who was left out?' },
	{ topic: 'Conflict & peace', pattern: /\b(world war|invasion|peace treaty|armistice|genocide|holocaust|atomic bomb|nuclear|battle of|cuban missile crisis|pearl harbor|hiroshima|nagasaki|september 11|d-day|surrenders)\b/i, lens: 'What changed for the people who lived through this conflict?' },
	{ topic: 'Discovery & ideas', pattern: /\b(first human|first person|first flight|moon|spacecraft|vaccine|penicillin|printing press|theory of|discovery|discovers|apollo 11|sputnik|world wide web|smallpox|darwin|einstein|wright brothers)\b/i, lens: 'What became possible after this breakthrough?' },
	{ topic: 'Culture & connection', pattern: /\b(statue of liberty|suez canal|panama canal|gutenberg|rosetta stone|transatlantic telegraph|industrial revolution)\b/i, lens: 'How did this change the way people understood or connected with the world?' },
];
const turningPoints = /\b(cuban missile crisis|statue of liberty|magna carta|berlin wall|apollo 11|pearl harbor|hiroshima|nagasaki|d-day|emancipation proclamation|declaration of independence|universal declaration of human rights|sputnik|world wide web|printing press|wright brothers|smallpox|united nations|suez canal|panama canal)\b/i;
export type EditionStory = HistoricalEvent & { topic: string; lens: string; context?: string; contextTitle?: string; contextUrl?: string };

// Transparent fallback ranking, not a claim of human editorial review.
export function selectStories(events: HistoricalEvent[]): EditionStory[] {
	const seen = new Set<string>();
	return events.flatMap(event => {
		const theme = themes.find(theme => theme.pattern.test(event.text));
		const id = `${event.year}:${event.text}`;
		if (!theme || seen.has(id)) return [];
		seen.add(id);
		const score = (turningPoints.test(event.text) ? 30 : 0)
			+ (/\b(independence|abolition|civil rights|first human|first flight|atomic bomb|moon landing)\b/i.test(event.text) ? 10 : 0)
			+ (/\b(treaty|begins|ends|signed|declares|first|adopted)\b/i.test(event.text) ? 3 : 0);
		return [{ ...event, topic: theme.topic, lens: theme.lens, score }];
	}).sort((a, b) => b.score - a.score || Number(a.year) - Number(b.year)).slice(0, 3);
}

export async function enrichStory(story: EditionStory): Promise<EditionStory> {
	const link = story.links?.find(link => themes.some(theme => theme.pattern.test(link.title))) ?? story.links?.[0];
	if (!link) return story;
	try {
		const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(link.title.replace(/\s+/g, '_'))}`, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(5000) });
		if (!response.ok) return story;
		const data = await response.json();
		if (data.type === 'disambiguation') return story;
		return { ...story, imageUrl: data.thumbnail?.source ?? null, context: typeof data.extract === 'string' ? data.extract : undefined, contextTitle: data.title ?? link.title, contextUrl: link.link };
	} catch { return story; }
}
