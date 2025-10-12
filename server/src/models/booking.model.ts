import mongoose from "mongoose";
import { bookingModel, BookingStatus } from "../types/bookingModel.types.js";

const bookingSchema = new mongoose.Schema<bookingModel>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalNumberOfDays: {
      type: Number,
    },
    guests: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.Pending,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Booking = mongoose.model<bookingModel>("Booking", bookingSchema);
export default Booking;
