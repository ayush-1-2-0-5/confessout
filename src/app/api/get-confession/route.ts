import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Confession from '../../../../models/Confession';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionName = searchParams.get('sessionName');
  if (!sessionName) {
    return NextResponse.json({ error: 'Session name is required' }, { status: 400 });
  }
  try {
    await connectToDatabase();
    const confessions = await Confession.find({ sessionName }).sort({ createdAt: 1 });
    return NextResponse.json(confessions);
  } catch (error) {
    console.error('Error fetching confessions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}