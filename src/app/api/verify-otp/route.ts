import { NextResponse } from 'next/server'
import { verifyOTP, getStoredOTP } from '../../../../lib/twilio'

export async function POST(request: Request) {
  const { phoneNumber, otp } = await request.json()
  console.log(`Received verification request for ${phoneNumber} with OTP: ${otp}`);
  
  const storedOTP = getStoredOTP(phoneNumber);
  console.log(`Stored OTP for ${phoneNumber}: ${storedOTP}`);

  try {
    const isValid = await verifyOTP(phoneNumber, otp)
    if (isValid) {
      return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error in verify-otp API:', error)
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })
  }
}