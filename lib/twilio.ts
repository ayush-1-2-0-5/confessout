import twilio from 'twilio';

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}

const twilioConfig: TwilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID!,
  authToken: process.env.TWILIO_AUTH_TOKEN!,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER!
};

const client = twilioConfig.accountSid && twilioConfig.authToken 
  ? twilio(twilioConfig.accountSid, twilioConfig.authToken) 
  : null;

// Use a Map instead of a plain object for better key handling
const otpStorage = new Map<string, { otp: string, timestamp: number }>();

export async function sendOTP(phoneNumber: string): Promise<string> {
  if (!client) {
    throw new Error('Twilio client not initialized');
  }

  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await client.messages.create({
      body: `Your OTP for confession access is: ${otp}`,
      from: twilioConfig.phoneNumber,
      to: formattedPhoneNumber
    });
    
    // Store OTP with timestamp
    otpStorage.set(phoneNumber, { otp, timestamp: Date.now() });
    
    console.log(`OTP sent to ${formattedPhoneNumber}: ${otp}`);
    console.log(`OTP stored for ${phoneNumber}: ${otpStorage.get(phoneNumber)?.otp}`);
    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
}

export async function verifyOTP(phoneNumber: string, otp: string): Promise<boolean> {
  const storedData = otpStorage.get(phoneNumber);
  
  if (!storedData) {
    console.log(`No OTP found for ${phoneNumber}`);
    return false;
  }

  console.log(`Stored OTP: ${storedData.otp}, Received OTP: ${otp}`);

  // Check if OTP is expired (5 minutes validity)
  if (Date.now() - storedData.timestamp > 5 * 60 * 1000) {
    console.log(`OTP expired for ${phoneNumber}`);
    otpStorage.delete(phoneNumber);
    return false;
  }

  if (storedData.otp === otp) {
    console.log(`OTP verified successfully for ${phoneNumber}`);
    otpStorage.delete(phoneNumber); // Remove OTP after successful verification
    return true;
  }

  console.log(`Invalid OTP for ${phoneNumber}`);
  return false;
}

export function getStoredOTP(phoneNumber: string): string | null {
  const storedData = otpStorage.get(phoneNumber);
  return storedData ? storedData.otp : null;
}

function formatPhoneNumber(phoneNumber: string): string {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  if (digitsOnly.length === 10) {
    return `+91${digitsOnly}`;
  } else if (digitsOnly.startsWith('91') && digitsOnly.length === 12) {
    return `+${digitsOnly}`;
  }
  return `+${digitsOnly}`;
}