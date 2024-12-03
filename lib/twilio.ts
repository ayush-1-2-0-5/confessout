import twilio from 'twilio';
import { Redis } from '@upstash/redis'

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}
const twilioConfig: TwilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID!,
  authToken: process.env.TWILIO_AUTH_TOKEN!,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER!,
};

const client = twilioConfig.accountSid && twilioConfig.authToken
  ? twilio(twilioConfig.accountSid, twilioConfig.authToken)
  : null;

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

function normalizePhoneNumber(phoneNumber: string): string {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  const normalizedNumber = digitsOnly.replace(/^91/, '');
  if (normalizedNumber.length !== 10) {
    throw new Error('Invalid phone number format');
  }
  return normalizedNumber;
}

function formatPhoneNumberForTwilio(phoneNumber: string): string {
  const normalized = normalizePhoneNumber(phoneNumber);
  return `+91${normalized}`;
}

export async function sendOTP(phoneNumber: string): Promise<string> {
  if (!client) {
    throw new Error('Twilio client not initialized');
  }

  try {
    const normalizedNumber = normalizePhoneNumber(phoneNumber);
    const twilioFormattedNumber = formatPhoneNumberForTwilio(phoneNumber);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(`otp:${normalizedNumber}`, otp, { ex: 300 });

    await client.messages.create({
      body: `Your OTP for accessing Confess Out is: ${otp}. Please note, this OTP is valid for only 5 minutes. If you did not request this OTP, please report it immediately by emailing us at {ayush2002agarwal@gmail.com}.`,
      from: twilioConfig.phoneNumber,
      to: twilioFormattedNumber,
    });

    console.log(`OTP sent to ${twilioFormattedNumber}`);
    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
}

export async function verifyOTP(phoneNumber: string, otp: string): Promise<boolean> {
    try {
      const normalizedNumber = normalizePhoneNumber(phoneNumber);
      const storedOTP = await redis.get<string>(`otp:${normalizedNumber}`); 
      console.log(`Verifying OTP for ${normalizedNumber}: Stored OTP: ${storedOTP}, Provided OTP: ${otp}`);

      if (!storedOTP) {
        console.log(`No OTP found for ${normalizedNumber}`);
        return false;
      }

  
      const isValid = storedOTP === otp;
      console.log(typeof(storedOTP))
      console.log(typeof(otp))
  
      if (isValid) {
        console.log(`OTP verified successfully for ${normalizedNumber}`);
        await redis.del(`otp:${normalizedNumber}`); 
      } else {
        console.log(`Invaid OTP provided for ${normalizedNumber}`);
      }
      return isValid; 
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  }
export async function getStoredOTP(phoneNumber: string): Promise<string | null> {
  try {
    const normalizedNumber = normalizePhoneNumber(phoneNumber);
    const storedOTP = await redis.get<string>(`otp:${normalizedNumber}`);
    return storedOTP;
  } catch (error) {
    console.error('Error getting stored OTP:', error);
    return null;
  }
}