import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function POST(request: Request) {
  const { sessionName } = await request.json();
  const sessionToken = Buffer.from(sessionName).toString('base64');
  const response = NextResponse.json({ message: 'Session created' });
  response.cookies.set('session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, 
    path: '/',
  });

  return response;
}

// DELETE - Delete the session cookie
export async function DELETE() {
  const response = NextResponse.json({ message: 'Session deleted' });

  // Delete the session cookie by setting it with an expired date
  response.cookies.delete('session');

  return response;
}
