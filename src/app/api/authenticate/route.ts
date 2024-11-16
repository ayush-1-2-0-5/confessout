import { NextResponse } from 'next/server';
import { mockAuthData } from '../../../../lib/mockDatabase'

export async function POST(request: Request) {
  try {
    const { sessionName, password, phoneNumber } = await request.json();

    const user = mockAuthData.find(
      (user) => user.sessionName === sessionName && 
                user.password === password && 
                user.phoneNumber === phoneNumber
    );

    if (user) {
      return NextResponse.json({ message: 'Authentication successful' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error in authenticate API:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}