import mongoose from "mongoose";

export interface propertyModel {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  pricePerNight: number;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
