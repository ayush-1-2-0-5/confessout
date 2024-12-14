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
    await redis.set(`otp:${normalizedNumber}`, otp, { ex: 300 });

    if (twilioConfig.trialMode) {
      console.log(`Trial mode: OTP for ${twilioFormattedNumber} is ${otp}`);
    } else {
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


// import { Redis } from '@upstash/redis';
// import * as unirest from 'unirest';

// const fast2SMSConfig = {
//   apiKey: process.env.FAST2SMS_API_KEY!, // Your Fast2SMS API key
//   route: 'otp', // OTP route
// };

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL!,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
// });

// // Normalize phone number by removing non-digit characters and country code
// function normalizePhoneNumber(phoneNumber: string): string {
//   const digitsOnly = phoneNumber.replace(/\D/g, ''); // Remove all non-digit characters
//   const normalizedNumber = digitsOnly.replace(/^91/, ''); // Remove the country code prefix (if any)
  
//   if (normalizedNumber.length !== 10) {
//     throw new Error('Invalid phone number format');
//   }
//   return normalizedNumber;
// }

// // Format phone number for Fast2SMS API (remove country code)
// function formatPhoneNumberForFast2SMS(phoneNumber: string): string {
//   const normalized = normalizePhoneNumber(phoneNumber);
//   return normalized; // For Fast2SMS, the number format is without +91 or country code
// }

// export async function sendOTP(phoneNumber: string): Promise<string> {
//   try {
//     console.time('sendOTP Execution Time'); // Measure execution time

//     const normalizedNumber = normalizePhoneNumber(phoneNumber); // Normalize phone number
//     console.log('Normalized Phone Number:', normalizedNumber); // Debugging: log the normalized phone number

//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
//     console.log('Generated OTP:', otp); // Debugging: log the generated OTP

//     // Store OTP in Redis with expiration of 5 minutes
//     await redis.set(`otp:${normalizedNumber}`, otp, { ex: 300 });

//     // Send OTP via Fast2SMS using unirest
//     const response = await new Promise<any>((resolve, reject) => {
//       const req = unirest.get('https://www.fast2sms.com/dev/bulkV2');

//       req.query({
//         authorization: fast2SMSConfig.apiKey, // Fast2SMS API key
//         variables_values: otp,  // OTP sent as numeric string
//         route: fast2SMSConfig.route, // Route for OTP
//         numbers: normalizedNumber, // Target phone number
//       });

//       req.headers({
//         'cache-control': 'no-cache',
//       });

//       req.end((res) => {
//         if (res.error) {
//           console.error('Fast2SMS Error:', res.error); // Log Fast2SMS error
//           console.error('Fast2SMS Response Body:', res.body); // Log the response body for debugging
//           reject(new Error(`Failed to send OTP: ${res.error}`));
//         } else {
//           console.log('Fast2SMS Response:', res.body); // Log Fast2SMS response for debugging
//           resolve(res.body);
//         }
//       });
      
//     });

//     // Check the response and log success or failure
//     if (response && response.return) {
//       console.log('OTP sent successfully:', response);
//     } else {
//       console.error('Failed to send OTP:', response.message);
//       throw new Error('Failed to send OTP');
//     }

//     console.timeEnd('sendOTP Execution Time'); // End execution time measurement
//     return otp;
//   } catch (error: unknown) {  // <-- Explicitly type the error as 'unknown'
//     if (error instanceof Error) {  // <-- Check if the error is an instance of 'Error'
//       console.error('Error sending OTP:', error.message); // Log the error message
//     } else {
//       console.error('Unknown error occurred');
//     }
//     throw new Error('Failed to send OTP');
//   }
// }

// export async function verifyOTP(phoneNumber: string, otp: string): Promise<boolean> {
//   try {
//     const normalizedNumber = normalizePhoneNumber(phoneNumber); // Normalize phone number
//     const storedOTP = await redis.get<string>(`otp:${normalizedNumber}`); // Get stored OTP from Redis

//     if (!storedOTP) {
//       console.log(`No OTP found for ${normalizedNumber}`);
//       return false;
//     }

//     const isValid = storedOTP === otp; // Verify OTP

//     if (isValid) {
//       console.log(`OTP verified successfully for ${normalizedNumber}`);
//       await redis.del(`otp:${normalizedNumber}`); // Delete OTP from Redis after successful verification
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
//     const normalizedNumber = normalizePhoneNumber(phoneNumber); // Normalize phone number
//     const storedOTP = await redis.get<string>(`otp:${normalizedNumber}`); // Get stored OTP from Redis
//     return storedOTP;
//   } catch (error) {
//     console.error('Error getting stored OTP:', error);
//     return null;
//   }
// }
