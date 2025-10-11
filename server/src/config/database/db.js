import mongoose from "mongoose";
import { environements } from "../environments/environments.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(environements.mongoURI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed", error);
  }
};
