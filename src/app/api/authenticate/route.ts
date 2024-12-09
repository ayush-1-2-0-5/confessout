import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import { Auth } from '../../../../models/Auth'
import redis from '../../../../lib/redis';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { sessionName, password, phoneNumber } = await request.json();
    await connectToDatabase();

    const user = await Auth.findOne({
      sessionName: sessionName,
      password: password,
      phoneNumber: phoneNumber
    });

    if (user) {
      const sessionToken = uuidv4();
      await redis.set(`session:${sessionToken}`, sessionName, {ex:3600});
      const response = NextResponse.json({ message: 'Authentication successful' }, { status: 200 });
      response.cookies.set('sessionToken', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 
      });

      return response;
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error in authenticate API:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

