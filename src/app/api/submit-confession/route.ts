import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Confession from '../../../../models/Confession';

export async function POST(request: Request) {
  try {
    const { sessionName, confession } = await request.json();
    await connectToDatabase();
    await Confession.create({ sessionName, confession });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}