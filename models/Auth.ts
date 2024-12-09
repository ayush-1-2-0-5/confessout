import mongoose from 'mongoose';

// Define the schema
const AuthSchema = new mongoose.Schema({
  sessionName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
});

// Create the model if it doesn't already exist
const Auth = mongoose.models.Auth || mongoose.model('Auth', AuthSchema);

// Named export
export { Auth };

// You can also optionally export functions to interact with this model
export async function isSessionNameUnique(sessionName: string): Promise<boolean> {
  const existingAuth = await Auth.findOne({ sessionName });
  return !existingAuth; // Return true if the session name doesn't exist
}

export async function createAuthEntry(sessionName: string, password: string, phoneNumber: string, email: string) {
  const isUnique = await isSessionNameUnique(sessionName);
  if (!isUnique) {
    throw new Error('Session name already exists.');
  }

  const newAuth = new Auth({ sessionName, password, phoneNumber, email });
  await newAuth.save();
  return newAuth;
}
