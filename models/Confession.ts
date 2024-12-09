import mongoose from 'mongoose';

const ConfessionSchema = new mongoose.Schema({
  sessionName: String,
  confession: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Confession || mongoose.model('Confession', ConfessionSchema);

