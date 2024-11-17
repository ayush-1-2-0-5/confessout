import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import redis from '../../../../lib/redis';

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const sessionName = await redis.get(`session:${sessionToken}`);

  if (!sessionName) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Authenticated', sessionName });
}