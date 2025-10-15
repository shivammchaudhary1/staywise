import React from "react";
import Button from "../common/Button";
import { BookingData } from "@/types/booking";
import { formatDate } from "@/utils/formatDate";
import { getStatusColor } from "@/utils/statusColor";

interface SeeAllBookingProps {
  allUpcomingBookings: BookingData[];
  allBookingHistory: BookingData[];
  isLoading: boolean;
  onUpdateStatus: (bookingId: string, status: string) => void;
}

const SeeAllBooking: React.FC<SeeAllBookingProps> = ({
  allUpcomingBookings,
  allBookingHistory,
  isLoading,
  onUpdateStatus,
}) => {
  // Get status badge color

  // Get property title safely
  const getPropertyTitle = (booking: BookingData) => {
    if (
      booking.propertyId &&
      typeof booking.propertyId === "object" &&
      booking.propertyId.title
    ) {
      return booking.propertyId.title;
    }
    return `Property ${booking.propertyId}`;
  };

  // Get property location safely
  const getPropertyLocation = (booking: BookingData) => {
    if (
      booking.propertyId &&
      typeof booking.propertyId === "object" &&
      booking.propertyId.location
    ) {
      const location = booking.propertyId.location;
      return `${location.city}, ${location.state}`;
    }
    return "Location not available";
  };

  // Render booking card
  const renderBookingCard = (
    booking: BookingData,
    showStatusButtons = false
  ) => (
    <div
      key={booking._id}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {getPropertyTitle(booking)}
          </h3>
          <p className="text-sm text-gray-500">
            {getPropertyLocation(booking)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Booking #{booking._id.slice(-8)}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
            booking.status
          )}`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Check-in</p>
          <p className="text-gray-800">{formatDate(booking.checkIn)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Check-out</p>
          <p className="text-gray-800">{formatDate(booking.checkOut)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Guests</p>
          <p className="text-gray-800">{booking.guests}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Total Price</p>
          <p className="text-gray-800 font-semibold">
            ₹{booking.totalPrice.toLocaleString()}
          </p>
        </div>
      </div>

      {showStatusButtons && booking.status.toLowerCase() === "pending" && (
        <div className="flex gap-2 mb-3">
          <Button
            text="Confirm"
            onClick={() => onUpdateStatus(booking._id, "confirmed")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
          />
          <Button
            text="Cancel"
            onClick={() => onUpdateStatus(booking._id, "cancelled")}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
          />
        </div>
      )}

      <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t">
        <span>
          User: {booking.userId.name} ({booking.userId._id.slice(-8)})
        </span>
        <span>Created: {formatDate(booking.createdAt)}</span>
      </div>
    </div>
  );

  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Booking Management
        </h1>
        {/* <Button
          text={isLoading ? "Loading..." : "Refresh Bookings"}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        /> */}
      </div>

      {/* Side by side layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking History - Left Side */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Booking History ({allBookingHistory.length})
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {allBookingHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                <p>No booking history found.</p>
                <p className="text-sm mt-1">
                  Click "Refresh Bookings" to load data.
                </p>
              </div>
            ) : (
              allBookingHistory.map((booking) =>
                renderBookingCard(booking, false)
              )
            )}
          </div>
        </div>

        {/* Upcoming Bookings - Right Side */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Upcoming Bookings ({allUpcomingBookings.length})
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {allUpcomingBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                <p>No upcoming bookings found.</p>
                <p className="text-sm mt-1">
                  Click "Refresh Bookings" to load data.
                </p>
              </div>
            ) : (
              allUpcomingBookings.map((booking) =>
                renderBookingCard(booking, true)
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeAllBooking;
