import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.MONGO_URI);
export const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected:${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1); //1 for failure and 0 for success
  }
};
