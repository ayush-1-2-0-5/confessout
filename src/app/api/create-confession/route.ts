import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import { Auth } from '../../../../models/Auth';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { sessionName, phoneNumber, email } = await request.json();
    if (!sessionName || !phoneNumber || !email) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    await connectToDatabase();
    const existingAuth = await Auth.findOne({ sessionName });
    if (existingAuth) {
      return NextResponse.json({ success: false, error: 'Session name already exists' }, { status: 400 });
    }

    const password = Math.random().toString(36).slice(-8);
    await Auth.create({ sessionName, password, phoneNumber, email });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Confession App" <noreply@confessionapp.com>',
      to: email,
      subject: 'Your Confession Details',
      text: `Session Name: ${sessionName}\nPassword: ${password}\nPhone Number: ${phoneNumber}`,
    });

    return NextResponse.json({ success: true, password });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
  }
}
