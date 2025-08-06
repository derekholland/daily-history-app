import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST() {
	// Await the revalidation so it completes before returning response
	await revalidatePath('/');

	return NextResponse.json({ revalidated: true });
}
