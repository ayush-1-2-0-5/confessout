import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import redis from '../../../../lib/redis';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const { sessionName } = await request.json();
  const sessionToken = uuidv4();

  await redis.set(`session:${sessionToken}`, sessionName, { ex: 3600 });
  const response = NextResponse.json({ message: 'Session created', sessionToken });
  const cookieStore = await cookies();
  cookieStore.set('sessionToken', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, 
    path: '/',
  });

  return response;
}

export async function DELETE() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;
  if (sessionToken) {
    await redis.del(`session:${sessionToken}`);
  }
  const response = NextResponse.json({ message: 'Session deleted' });
  cookieStore.delete('sessionToken');
  return response;
}