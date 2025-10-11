import mongoose from "mongoose";
import { environments } from "../environments/environments.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(environments.mongoURI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed", error);
  }
};
