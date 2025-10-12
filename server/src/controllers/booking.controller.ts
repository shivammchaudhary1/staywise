import { Request, Response } from "express";
import Booking from "../models/booking.model.js";
import { TokenPayload } from "../types/tokenPayload.types.js";
import { BookingStatus } from "../types/bookingModel.types.js";

interface RequestWithUser extends Request {
  user?: TokenPayload;
}

export const createBooking = async (
  req: RequestWithUser,
  res: Response
): Promise<Response | void> => {
  try {
    const { propertyId, checkIn, checkOut, guests, totalPrice, status } =
      req.body;
    const userId = req.user?.userId;

    if (!propertyId || !checkIn || !checkOut || !guests || !userId) {
      return res.status(400).json({ message: "All fields Are Required" });
    }

    const newBooking = new Booking({
      userId,
      propertyId,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status: status ? status : BookingStatus.Pending,
    });

    await newBooking.save();

    return res.status(201).json({
      message: "Booking created successfully.",
      success: true,
      booking: newBooking,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
};

//only show upcoming bookings
export const userBooking = async (
  req: RequestWithUser,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    const currentDate = new Date();

    const bookings = await Booking.find({
      userId,
      checkOut: { $gte: currentDate },
    })
      .populate("propertyId", "title location images")
      .sort({ checkIn: 1 });

    return res.status(200).json({
      message: "User's upcoming bookings retrieved successfully",
      success: true,
      bookings,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
};

export const updateBooking = async (
  req: RequestWithUser,
  res: Response
): Promise<Response | void> => {
  try {
    const { bookingId } = req.params;
    const { checkIn, checkOut, guests } = req.body;
    const userId = req.user?.userId;

    console.log("Update Booking Request Body:", req.body);
    console.log("Booking ID:", bookingId);
    console.log("User ID from token:", userId);

    if (!userId) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    if (!bookingId) {
      return res
        .status(400)
        .json({ message: "Booking ID is required", success: false });
    }

    if (!checkIn && !checkOut && !guests) {
      return res.status(400).json({
        message:
          "At least one field (checkIn, checkOut, or guests) must be provided",
        success: false,
      });
    }

    // Find booking and verify ownership
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });
    }

    if (booking.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this booking",
        success: false,
      });
    }

    // Create update object with only the fields that were provided
    const updateData: { [key: string]: any } = {};

    if (checkIn) {
      updateData.checkIn = new Date(checkIn);
    }

    if (checkOut) {
      updateData.checkOut = new Date(checkOut);
    }

    if (guests) {
      updateData.guests = guests;
    }

    // Calculate total number of days if both dates are provided or one is changed
    if (
      (checkIn && checkOut) ||
      (checkIn && !checkOut && booking.checkOut) ||
      (!checkIn && checkOut && booking.checkIn)
    ) {
      const startDate = checkIn ? new Date(checkIn) : booking.checkIn;
      const endDate = checkOut ? new Date(checkOut) : booking.checkOut;

      const timeDiff = endDate.getTime() - startDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff <= 0) {
        return res.status(400).json({
          message: "Check-out date must be after check-in date",
          success: false,
        });
      }

      updateData.totalNumberOfDays = daysDiff;
    }

    // Update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      message: "Booking updated successfully",
      success: true,
      booking: updatedBooking,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
};

export const deleteBooking = async (
  req: RequestWithUser,
  res: Response
): Promise<Response | void> => {
  try {
    const { bookingId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    if (!bookingId) {
      return res
        .status(400)
        .json({ message: "Booking ID is required", success: false });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });
    }

    // Verify booking belongs to the authenticated user
    if (booking.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this booking",
        success: false,
      });
    }

    await Booking.findByIdAndDelete(bookingId);

    return res.status(200).json({
      message: "Booking deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
};

export const bookingHistory = async (
  req: RequestWithUser,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    const currentDate = new Date();

    // Find all bookings with checkout dates in the past
    const bookingHistory = await Booking.find({
      userId,
      checkOut: { $lt: currentDate },
    })
      .populate("propertyId", "title location images")
      .sort({ checkOut: -1 });

    return res.status(200).json({
      message: "Booking history retrieved successfully",
      success: true,
      bookingHistory,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
};

export const adminUpcomingBookings = async (
  req: RequestWithUser,
  res: Response
): Promise<Response | void> => {
  try {
    // Check if user is admin (assuming admin role is stored in token)
    const isAdmin = req.user?.role === "admin";

    if (!isAdmin) {
      return res.status(403).json({
        message: "Unauthorized. Admin access required",
        success: false,
      });
    }

    const currentDate = new Date();

    // Pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Optional filter parameters
    const propertyId = req.query.propertyId as string;
    const status = req.query.status as string;
    const sortBy = (req.query.sortBy as string) || "checkIn"; // Default sort by check-in date
    const sortOrder = (req.query.sortOrder as string) === "desc" ? -1 : 1;

    // Build query filter
    const filter: { [key: string]: any } = {
      checkIn: { $gte: currentDate },
    };

    // Add optional filters if provided
    if (propertyId) {
      filter.propertyId = propertyId;
    }

    if (
      status &&
      Object.values(BookingStatus).includes(status as BookingStatus)
    ) {
      filter.status = status;
    }

    // Create sort object
    const sort: { [key: string]: 1 | -1 } = {};
    sort[sortBy] = sortOrder;

    // Find all bookings with checkout dates in the future or today
    const upcomingBookings = await Booking.find(filter)
      .populate("propertyId", "title location images price")
      .populate("userId", "name email phone") // Include user details for admin
      .sort(sort as any)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalCount = await Booking.countDocuments(filter);

    return res.status(200).json({
      message: "Upcoming bookings retrieved successfully",
      success: true,
      upcomingBookings,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalBookings: totalCount,
        itemsPerPage: limit,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
};

export const adminBookingHistory = async (
  req: RequestWithUser,
  res: Response
): Promise<Response | void> => {
  try {
    // Check if user is admin
    const isAdmin = req.user?.role === "admin";

    if (!isAdmin) {
      return res.status(403).json({
        message: "Unauthorized. Admin access required",
        success: false,
      });
    }

    const currentDate = new Date();

    // Pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Optional filter parameters
    const propertyId = req.query.propertyId as string;
    const userId = req.query.userId as string;
    const status = req.query.status as string; // Filter by booking status
    const fromDate = req.query.fromDate
      ? new Date(req.query.fromDate as string)
      : null;
    const toDate = req.query.toDate
      ? new Date(req.query.toDate as string)
      : null;
    const sortBy = (req.query.sortBy as string) || "checkOut"; // Default sort by check-out date
    const sortOrder = (req.query.sortOrder as string) === "asc" ? 1 : -1; // Default descending

    // Build query filters
    const filter: { [key: string]: any } = {
      checkOut: { $lt: currentDate },
    };

    // Add optional filters if provided
    if (propertyId) {
      filter.propertyId = propertyId;
    }

    if (userId) {
      filter.userId = userId;
    }

    if (
      status &&
      Object.values(BookingStatus).includes(status as BookingStatus)
    ) {
      filter.status = status;
    }

    if (fromDate && toDate) {
      filter.checkOut = { $gte: fromDate, $lte: toDate };
    } else if (fromDate) {
      filter.checkOut = { $gte: fromDate, $lt: currentDate };
    } else if (toDate) {
      filter.checkOut = { $lte: toDate };
    }

    // Create sort object
    const sort: { [key: string]: 1 | -1 } = {};
    sort[sortBy] = sortOrder;

    // Find all past bookings with applied filters
    const bookingHistory = await Booking.find(filter)
      .populate("propertyId", "title location images price")
      .populate("userId", "name email phone")
      .sort(sort as any)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalCount = await Booking.countDocuments(filter);

    return res.status(200).json({
      message: "Booking history retrieved successfully",
      success: true,
      bookingHistory,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalBookings: totalCount,
        itemsPerPage: limit,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message || "Unknown error occurred",
    });
  }
};
