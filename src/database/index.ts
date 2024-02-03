import mongoose from 'mongoose';

export async function Mongo() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    console.log('Connection mongoDB...');
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('Connected to mongoDB!');
  } catch {
    throw new Error('Cannot connect to Mongo');
  }
}
