// types/index.ts
export interface HistoricalEvent {
	year: string;
	text: string;
	links: {
		title: string;
		link: string;
	}[];
}
