// 'use client';

// import { useTheme } from 'next-themes';
// import { Moon, Sun } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// export function ThemeToggle() {
// 	const { setTheme, resolvedTheme } = useTheme();

// 	return (
// 		<Button
// 			variant='ghost'
// 			size='icon'
// 			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
// 			aria-label='Toggle theme'>
// 			{resolvedTheme === 'dark' ? (
// 				<Sun className='w-5 h-5' />
// 			) : (
// 				<Moon className='w-5 h-5' />
// 			)}
// 		</Button>
// 	);
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';
// import { Sun, Moon } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// export function ThemeToggle() {
// 	const { resolvedTheme, setTheme } = useTheme();

// 	const [mounted, setMounted] = useState(false);

// 	useEffect(() => {
// 		setMounted(true);
// 	}, []);

// 	// Only render toggle after component has mounted on the client
// 	if (!mounted) return null;

// 	return (
// 		<Button
// 			variant='ghost'
// 			size='icon'
// 			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
// 			aria-label='Toggle theme'>
// 			{resolvedTheme === 'dark' ? (
// 				<Sun className='w-5 h-5' />
// 			) : (
// 				<Moon className='w-5 h-5' />
// 			)}
// 		</Button>
// 	);
// }

'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			aria-label='Toggle theme'>
			<span suppressHydrationWarning>
				{mounted && resolvedTheme === 'dark' ? (
					<Sun className='w-5 h-5' />
				) : (
					<Moon className='w-5 h-5' />
				)}
			</span>
		</Button>
	);
}
