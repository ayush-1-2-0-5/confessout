// import twilio from 'twilio';
// import { Redis } from '@upstash/redis'

// interface TwilioConfig {
//   accountSid: string;
//   authToken: string;
//   phoneNumber: string;
//   trialMode: boolean;
// }
// const twilioConfig: TwilioConfig = {
//   accountSid: process.env.TWILIO_ACCOUNT_SID!,
//   authToken: process.env.TWILIO_AUTH_TOKEN!,
//   phoneNumber: process.env.TWILIO_PHONE_NUMBER!,
//   trialMode: process.env.TWILIO_TRIAL_MODE === 'true',
// };

// const client = twilioConfig.accountSid && twilioConfig.authToken
//   ? twilio(twilioConfig.accountSid, twilioConfig.authToken)
//   : null;

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL!,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
// })

// function normalizePhoneNumber(phoneNumber: string): string {
//   const digitsOnly = phoneNumber.replace(/\D/g, '');
//   const normalizedNumber = digitsOnly.replace(/^91/, '');
//   if (normalizedNumber.length !== 10) {
//     throw new Error('Invalid phone number format');
//   }
//   return normalizedNumber;
// }

// function formatPhoneNumberForTwilio(phoneNumber: string): string {
//   const normalized = normalizePhoneNumber(phoneNumber);
//   return `+91${normalized}`;
// }

// export async function sendOTP(phoneNumber: string): Promise<string> {
//   if (!client) {
//     throw new Error('Twilio client not initialized');
//   }

//   try {
//     console.time('sendOTP Execution Time');
//     const normalizedNumber = normalizePhoneNumber(phoneNumber);
//     const twilioFormattedNumber = formatPhoneNumberForTwilio(phoneNumber);
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     await redis.set(`otp:${normalizedNumber}`, otp, { ex: 300 });

//     if (twilioConfig.trialMode) {
//       console.log(`Trial mode: OTP for ${twilioFormattedNumber} is ${otp}`);
//     } else {
//       await client.messages.create({
//         body: `Your OTP for accessing Confess Out is: ${otp}.`,
//         from: twilioConfig.phoneNumber,
//         to: twilioFormattedNumber,
//       });
//       console.log(`OTP sent to ${twilioFormattedNumber}`);
//     }

//     console.timeEnd('sendOTP Execution Time');
//     return otp;
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     throw new Error('Failed to send OTP');
//   }
// }

// export async function verifyOTP(phoneNumber: string, otp: string): Promise<boolean> {
//   try {
//     const normalizedNumber = normalizePhoneNumber(phoneNumber);
//     const storedOTP = await redis.get<string>(`otp:${normalizedNumber}`);
//     console.log(`Verifying OTP for ${normalizedNumber}: Stored OTP: ${storedOTP}, Provided OTP: ${otp}`);

//     if (!storedOTP) {
//       console.log(`No OTP found for ${normalizedNumber}`);
//       return false;
//     }

//     const isValid = storedOTP === otp;

//     if (isValid) {
//       console.log(`OTP verified successfully for ${normalizedNumber}`);
//       await redis.del(`otp:${normalizedNumber}`);
//     } else {
//       console.log(`Invalid OTP provided for ${normalizedNumber}`);
//     }
//     return isValid;
//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     return false;
//   }
// }

// export async function getStoredOTP(phoneNumber: string): Promise<string | null> {
//   try {
//     const normalizedNumber = normalizePhoneNumber(phoneNumber);
//     const storedOTP = await redis.get<string>(`otp:${normalizedNumber}`);
//     return storedOTP;
//   } catch (error) {
//     console.error('Error getting stored OTP:', error);
//     return null;
//   }
// }

import { Redis } from '@upstash/redis';
import axios from 'axios';
const fast2SMSConfig = {
  apiKey: process.env.FAST2SMS_API_KEY!,
  route: 'otp',
};

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
function normalizePhoneNumber(phoneNumber: string): string {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  const normalizedNumber = digitsOnly.replace(/^91/, '');
  
  if (normalizedNumber.length !== 10) {
    throw new Error('Invalid phone number format');
  }
  return normalizedNumber;
}
export async function sendOTP(phoneNumber: string): Promise<string> {
  try {
    console.time('sendOTP Execution Time');
    const normalizedNumber = normalizePhoneNumber(phoneNumber);
    console.log('Normalized Phone Number:', normalizedNumber);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp);
    await redis.set(`otp:${normalizedNumber}`, otp, { ex: 300 });

    const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
      params: {
        authorization: fast2SMSConfig.apiKey,
        variables_values: otp,
        route: fast2SMSConfig.route,
        numbers: normalizedNumber,
      },
      headers: {
        'cache-control': 'no-cache',
      },
    });

    if (response.data && response.data.return) {
      console.log('OTP sent successfully:', response.data);
    } else {
      console.error('Failed to send OTP:', response.data.message);
      throw new Error('Failed to send OTP');
    }
    console.timeEnd('sendOTP Execution Time');
    return otp;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error sending OTP:', error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error('Error sending OTP:', error.message);
    } else {
      console.error('Unknown error occurred');
    }
    throw new Error('Failed to send OTP');
  }
}

export async function verifyOTP(phoneNumber: string, otp: string): Promise<boolean> {
  try {
    const normalizedNumber = normalizePhoneNumber(phoneNumber);
    const storedOTP = await redis.get<string>(`otp:${normalizedNumber}`); 

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