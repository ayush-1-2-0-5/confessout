import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import { Auth } from '../../../../models/Auth';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { sessionName, phoneNumber, email } = await request.json();
    if (!sessionName || !phoneNumber || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const existingAuth = await Auth.findOne({ sessionName });
    if (existingAuth) {
      return NextResponse.json(
        { success: false, error: 'Session name already exists' },
        { status: 400 }
      );
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

    const websiteLink = 'https://confessout.vercel.app/';
    const seeconfessionLink = 'https://confessout.vercel.app/gotoyourconfession';
    const emailMessage = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4caf50;">You have a chitthi waiting for you!</h2>
        <p>
          Welcome to <strong>Chitthi</strong>, the platform where you can share your thoughts and feelings without revealing your identity.
        </p>
        <h3>Here are your details:</h3>
        <ul>
          <li><strong>Session Name:</strong> ${sessionName}</li>
          <li><strong>Password:</strong> ${password}</li>
          <li><strong>Phone Number:</strong> ${phoneNumber}</li>
        </ul>
        <p>
          Ready to see your chitthi? Click the link below:
        </p>
        <p>
          <a href="${seeconfessionLink}" style="color: #1a73e8; font-weight: bold;">See Your Chitthi</a>
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="color: #666; font-size: 14px;">
          Chitthi is a platform to share your thoughts with someone without revealing your identity.
        </p>
        <p>
          Try it out here: <a href="${websiteLink}" style="color: #1a73e8;">${websiteLink}</a>
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: '"Chitthi" <noreply@confessionapp.com>',
      to: email,
      subject: 'Your Confession Details',
      html: emailMessage,
    });

    return NextResponse.json({ success: true, password });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json(
        { success: false, error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
}
