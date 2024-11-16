// /src/app/api/get-confession/route.ts

import { NextResponse } from 'next/server';  // Import NextResponse from 'next/server'
import { confessions } from '../../../../lib/mockDatabase';  // Assuming mockDatabase is correctly set

// Named export for the GET method
export async function GET(req: Request) {
  // Extract sessionName from the URL search params using the `.get()` method
  const sessionName = new URL(req.url).searchParams.get('sessionName');  // Correct way to extract query params

  // Ensure sessionName is provided
  if (!sessionName) {
    return NextResponse.json({ error: 'Session name is required' }, { status: 400 });
  }

  // Filter confessions by sessionName
  const userConfessions = confessions.filter(c => c.sessionName === sessionName);

  // If confessions are found, return them
  if (userConfessions.length > 0) {
    return NextResponse.json(userConfessions, { status: 200 });
  } else {
    // If no confessions found, return an error
    return NextResponse.json({ error: 'No confessions found for this session' }, { status: 404 });
  }
}
