import express, { Application, Request, Response } from "express";
import cors from "cors";
import { environments } from "../environments/environment.js";
import { connectDB } from "../database/db.js";
import appRoutes from "../../routes/app.routes.js";

export const appConfiguration = async (): Promise<void> => {
  try {
    const app: Application = express();

    app.use(express.json());
    app.use(cors());

    app.get("/test", (_req: Request, res: Response) => {
      res.status(200).json({ message: "Test endpoint works!" });
    });

    try {
      appRoutes(app);
      // console.log("Routes configured successfully");
    } catch (routeError) {
      // console.error("Error configuring routes:", routeError);
      throw routeError;
    }

    app.get("/", (_req: Request, res: Response) => {
      res.status(200).json({
        message: "API is running successfully!!",
        timestamp: new Date().toISOString(),
      });
    });

    // Connect to database
    await connectDB();

    // Start the server
    await new Promise<void>((resolve) => {
      app.listen(environments.port, () => {
        console.log(`Server is running on port ${environments.port}`);
        resolve();
      });
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    throw error;
  }
};
