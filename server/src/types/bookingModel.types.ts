import mongoose from "mongoose";

export enum BookingStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Cancelled = "cancelled",
}

export interface bookingModel {
  userId: mongoose.Types.ObjectId;
  propertyId: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  totalNumberOfDays: number;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}
