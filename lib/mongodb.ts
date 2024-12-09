import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
console.log("1")

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
console.log("1")
interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}
console.log("1")

let cached: CachedConnection = (global as any).mongoose;
console.log("1")
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}
console.log("1")

async function connectToDatabase(): Promise<typeof mongoose> {
  console.log("1")
  if (cached.conn) {
    console.log("2")
    return cached.conn;
  }
  console.log("1")

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("1")
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  console.log("1")

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
    return cached.conn;
}

export default connectToDatabase;

