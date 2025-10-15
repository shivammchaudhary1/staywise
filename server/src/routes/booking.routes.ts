import express from "express";
const bookingRoutes = express.Router();
import {
  createBooking,
  userBooking,
  deleteBooking,
  updateBooking,
  bookingHistory,
  updateStatus,
  adminUpcomingBookings,
  adminBookingHistory,
} from "../controllers/booking.controller.js";
import { roleMiddleware } from "../middleware/auth.middleware.js";

// User booking routes
bookingRoutes.post("/create", createBooking);
bookingRoutes.get("/user-bookings", userBooking);
bookingRoutes.get("/user-history", bookingHistory); //problem in this
bookingRoutes.put("/:bookingId", updateBooking);
bookingRoutes.delete("/:bookingId", deleteBooking);
bookingRoutes.patch("/status/:bookingId", updateStatus); // PATCH route for status updates

// Admin routes
bookingRoutes.get("/admin/upcoming", roleMiddleware(), adminUpcomingBookings);
bookingRoutes.get("/admin/history", roleMiddleware(), adminBookingHistory);

export default bookingRoutes;
