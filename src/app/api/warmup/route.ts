import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // List of API routes to warm up
    const routes = [
      '/api/send-otp',
      '/api/verify-otp',
      '/api/check-auth',
      '/api/session',
      '/api/authenticate',
      '/api/get-confession'
    ];

    // Warm up each route
    const warmupPromises = routes.map(route => 
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}${route}`, { method: 'HEAD' })
    );

    await Promise.all(warmupPromises);

    return NextResponse.json({ message: 'Warmup completed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error during warmup:', error);
    return NextResponse.json({ error: 'Warmup failed' }, { status: 500 });
  }
}

