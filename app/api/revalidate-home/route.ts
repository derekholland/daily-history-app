import { revalidateHomePath } from '@/app/actions/revalidateHome';
import { NextResponse } from 'next/server';

export async function POST() {
	await revalidateHomePath();
	return NextResponse.json({ revalidated: true });
}
