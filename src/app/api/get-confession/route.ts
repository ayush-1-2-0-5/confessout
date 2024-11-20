// /src/app/api/get-confession/route.ts

import { NextResponse } from 'next/server';  
import { confessions } from '../../../../lib/mockDatabase';
export async function GET(req: Request) {
  const sessionName = new URL(req.url).searchParams.get('sessionName');
  if (!sessionName) {
    return NextResponse.json({ error: 'Session name is required' }, { status: 400 });
  }
  const userConfessions = confessions.filter(c => c.sessionName === sessionName);
  if (userConfessions.length > 0) {
    return NextResponse.json(userConfessions, { status: 200 });
  } else {
    return NextResponse.json({ error: 'No confessions found for this session' }, { status: 404 });
  }
}
