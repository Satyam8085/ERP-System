import mongoose from "mongoose";

export async function connectDatabase() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn("MONGO_URI not provided. Backend will run with in-memory seed data.");
    return { connected: false, mode: "memory" };
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB.");
    return { connected: true, mode: "mongo" };
  } catch (error) {
    console.warn(
      `MongoDB connection failed. Falling back to in-memory seed data. ${error.message}`
    );
    return { connected: false, mode: "memory" };
  }
}
