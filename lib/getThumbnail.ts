export async function getThumbnail(title: string): Promise<string | null> {
	const formattedTitle = title.replace(/\s+/g, '_');
	const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedTitle}`;

	try {
		const res = await fetch(url, { cache: 'force-cache' });
		if (!res.ok) return null;
		const data = await res.json();
		return data.thumbnail?.source || null;
	} catch (error) {
		console.error('Failed to fetch thumbnail:', error);
		return null;
	}
}
