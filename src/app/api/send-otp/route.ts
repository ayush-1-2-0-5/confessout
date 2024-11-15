import { NextResponse } from 'next/server'
import { sendOTP } from '../../../../lib/twilio'

export async function POST(request: Request) {
  const { phoneNumber } = await request.json()

  try {
    const otp = await sendOTP(phoneNumber)
    console.log(`OTP sent successfully to ${phoneNumber}: ${otp}`)
    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in send-otp API:', error)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}