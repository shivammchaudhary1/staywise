import express from "express";
import cors from "cors";
import { environements } from "../environments/environments.js";
import { connectDB } from "../database/db.js";

export const appConfiguration = () => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cors());

  // CORS Configuration
  app.get("/", (req, res) => {
    res.send("API is running...");
  });

  app.listen(environements.port, async () => {
    try {
      await connectDB();
      console.log(`Server is running on port ${environements.port}`);
    } catch (error) {
      console.error("Server failed to start", error);
    }
  });
};
