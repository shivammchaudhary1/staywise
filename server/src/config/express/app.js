import express from "express";
import cors from "cors";
import { environments } from "../environments/environments.js";
import { connectDB } from "../database/db.js";

export const appConfiguration = () => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cors());

  // CORS Configuration
  app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running..." });
  });

  app.listen(environments.port, async () => {
    try {
      await connectDB();
      console.log(`Server is running on port ${environments.port}`);
    } catch (error) {
      console.error("Server failed to start", error);
    }
  });
};
