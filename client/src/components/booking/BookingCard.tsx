import React from "react";
import { getStatusColor } from "@/utils/statusColor";

interface Booking {
  _id: string;
  userId: string;
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Booking Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Booking #{booking._id.slice(-8)}
          </h2>
          <p className="text-gray-500 mt-1">
            Property ID: {booking.propertyId.slice(-8)}
          </p>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
            booking.status
          )}`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      {/* Booking Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-600 mb-1">
            Check-in Date
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {formatDate(booking.checkIn)}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-600 mb-1">
            Check-out Date
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {formatDate(booking.checkOut)}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-600 mb-1">Guests</div>
          <div className="text-lg font-semibold text-gray-900">
            {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-600 mb-1">
            Total Price
          </div>
          <div className="text-lg font-semibold text-green-600">
            ${booking.totalPrice.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Booking Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Booked on {formatDate(booking.createdAt)}
        </div>
        <div className="flex space-x-2">
          {booking.status === "confirmed" && (
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
              View Details
            </button>
          )}
          {booking.status === "pending" && (
            <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors">
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
