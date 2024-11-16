import { NextResponse } from 'next/server';
import { verifyOTP, getStoredOTP } from '../../../../lib/twilio';

export async function POST(request: Request) {
  try {
    const { phoneNumber, otp } = await request.json();
    console.log(phoneNumber)
    console.log(otp)
    const storedOTP = await getStoredOTP(phoneNumber);
    console.log(`Verifying OTP for ${phoneNumber}: Stored OTP: ${storedOTP}, Provided OTP: ${otp}`);
    const isValid = Number(storedOTP) === Number(otp);
   
    console.log(typeof Number(storedOTP));
    console.log(typeof Number(otp));       
    console.log(isValid);
   
    if (isValid) {
      return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in verify-otp API:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
