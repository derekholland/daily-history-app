'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
	const pathname = usePathname();

	return (
		<nav className='flex justify-between items-center px-4 py-3 border-b sticky top-0 bg-background z-10'>
			<Link href='/' className='flex items-center gap-2 text-xl font-bold'>
				<CalendarDays className='w-6 h-6' />
				<span>This Day in History</span>
			</Link>

			<div className='flex items-center gap-4'>
				<Link
					href='/favorites'
					className={cn('text-sm font-medium hover:underline', {
						'text-primary': pathname === '/favorites',
						'text-muted-foreground': pathname !== '/favorites'
					})}>
					Favorites
				</Link>

				<ThemeToggle />
			</div>
		</nav>
	);
}
