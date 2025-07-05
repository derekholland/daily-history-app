// types.ts
export interface HistoricalEvent {
	year: string;
	text: string;
	links?: {
		title: string;
		link: string;
	}[];
	imageUrl?: string | null; // ✅ Add this
}
