import twilio from 'twilio';
import { Redis } from '@upstash/redis'

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
  trialMode: boolean;
}

const twilioConfig: TwilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID!,
  authToken: process.env.TWILIO_AUTH_TOKEN!,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER!,
  trialMode: process.env.TWILIO_TRIAL_MODE === 'true',
};

const client = twilioConfig.accountSid && twilioConfig.authToken
  ? twilio(twilioConfig.accountSid, twilioConfig.authToken)
  : null;

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
    console.time('sendOTP Execution Time');

    const normalizedNumber = normalizePhoneNumber(phoneNumber);
    const twilioFormattedNumber = formatPhoneNumberForTwilio(phoneNumber);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in Redis with a TTL of 5 minutes
    await redis.set(`otp:${normalizedNumber}`, otp, { ex: 300 });

    if (twilioConfig.trialMode) {
      console.log(`Trial mode: OTP for ${twilioFormattedNumber} is ${otp}`);
    } else {
      // Send SMS via Twilio
      await client.messages.create({
        body: `Your OTP for accessing Confess Out is: ${otp}.`,
        from: twilioConfig.phoneNumber,
        to: twilioFormattedNumber,
      });
      console.log(`OTP sent to ${twilioFormattedNumber}`);
    }

    console.timeEnd('sendOTP Execution Time');
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

    if (isValid) {
      console.log(`OTP verified successfully for ${normalizedNumber}`);
      await redis.del(`otp:${normalizedNumber}`);
    } else {
      console.log(`Invalid OTP provided for ${normalizedNumber}`);
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

