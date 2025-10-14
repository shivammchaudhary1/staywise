import express from "express";
const propertyRoutes = express.Router();
import { roleMiddleware ,authMiddleware} from "../middleware/auth.middleware.js";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controller.js";

propertyRoutes.post("/add",authMiddleware, roleMiddleware(), createProperty);
propertyRoutes.get("/", getAllProperties);
propertyRoutes.get("/:propertyId", getPropertyById);
propertyRoutes.put("/:propertyId", authMiddleware, roleMiddleware(), updateProperty);
propertyRoutes.delete("/:propertyId", authMiddleware, roleMiddleware(), deleteProperty);

export default propertyRoutes;
