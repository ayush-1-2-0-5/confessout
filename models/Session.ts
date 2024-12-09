import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  sessionToken: {
    type: String,
    required: true,
    unique: true
  },
  sessionName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 
  }
});

export const Session = mongoose.models.Session || mongoose.model('Session', SessionSchema);

