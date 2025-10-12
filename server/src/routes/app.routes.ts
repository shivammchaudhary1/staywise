import authRoutes from "./auth.routes.js";
import propertyRoutes from "./property.routes.js";
import { Application } from "express";
import {
  authMiddleware,
  roleMiddleware,
} from "../middleware/auth.middleware.js";

const appRoutes = (app: Application) => {
  // console.log("Registering routes...");
  app.use("/api/auth", authRoutes);
  app.use("/api/properties", authMiddleware, propertyRoutes);
  
  // console.log("Routes registered successfully!");
};

export default appRoutes;
