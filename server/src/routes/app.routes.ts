import authRoutes from "./auth.routes.js";
import propertyRoutes from "./property.routes.js";
import { Application } from "express";
import bookingRoutes from "./booking.routes.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const appRoutes = (app: Application) => {
  // console.log("Registering routes...");
  app.use("/api/auth", authRoutes);
  app.use("/api/properties", authMiddleware, propertyRoutes);
  app.use("/api/booking", authMiddleware, bookingRoutes);

  // console.log("Routes registered successfully!");
};

export default appRoutes;
