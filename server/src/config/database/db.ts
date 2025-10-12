import mongoose from "mongoose";
import { environments } from "../environments/environment.js";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(environments.mongoURI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed", error);
    throw error;
  }
};
