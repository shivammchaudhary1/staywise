import mongoose from "mongoose";
import { propertyModel } from "../types/propertyModel.types.js";

const propertyScehma = new mongoose.Schema<propertyModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    location: {
      address: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      zipCode: { type: String, required: true, trim: true },
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Property = mongoose.model<propertyModel>("Property", propertyScehma);
export default Property;
