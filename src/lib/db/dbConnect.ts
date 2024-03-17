import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached: any | null = null;

async function dbConnect() {
  if (cached) {
    console.log('Using existing MongoDB connection');
    return cached;
  }

  const opts = {
    maxPoolSize: 50, // default: 100
  };

  try {
    cached = await mongoose.connect(MONGODB_URI, opts);
    console.log('Connected to MongoDB');
    return cached;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

export default dbConnect;