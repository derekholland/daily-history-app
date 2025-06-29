import { FavoritesClient } from '../../components/favorites-client';

export default function FavoritesPage() {
	return (
		<main className='max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6'>
			<h1 className='text-2xl font-bold'>⭐ Your Favorite Events</h1>
			<FavoritesClient />
		</main>
	);
}
