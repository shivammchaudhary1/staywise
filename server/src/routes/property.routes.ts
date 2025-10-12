import express from "express";
const propertyRoutes = express.Router();
import { roleMiddleware } from "../middleware/auth.middleware.js";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controller.js";

propertyRoutes.post("/add", roleMiddleware(), createProperty);
propertyRoutes.get("/", getAllProperties);
propertyRoutes.get("/:propertyId", getPropertyById);
propertyRoutes.put("/:propertyId", roleMiddleware(), updateProperty);
propertyRoutes.delete("/:propertyId", roleMiddleware(), deleteProperty);

export default propertyRoutes;
