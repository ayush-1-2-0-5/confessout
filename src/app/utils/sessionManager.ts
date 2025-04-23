import { encrypt, decrypt } from './encryption';

export interface SessionData {
  sessionName: string;
  expiresAt: number;
}

export function createSession(sessionName: string): string {
  const expiresAt = Date.now() + 60 * 60 * 1000; // 60 minutes from now
  const sessionData: SessionData = { sessionName, expiresAt };
  return encrypt(JSON.stringify(sessionData));
}

export function verifySession(encryptedSession: string): SessionData | null {
  try {
    const decrypted = decrypt(encryptedSession);
    const sessionData: SessionData = JSON.parse(decrypted);
    if (Date.now() < sessionData.expiresAt) {
      return sessionData;
    }
  } catch (error) {
    console.error('Error verifying session:', error);
  }
  return null;
}

