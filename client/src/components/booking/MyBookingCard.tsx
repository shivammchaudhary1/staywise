import React from "react";
import Image from "next/image";
import { MyBookingCardProps } from "@/types/booking";
import Link from "next/link";

const MyBookingCard: React.FC<MyBookingCardProps> = ({
  booking,
  handleCancelledBooking,
}) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate number of nights
  const calculateNights = () => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Check if booking is upcoming
  const isUpcoming = () => {
    const today = new Date();
    const checkInDate = new Date(booking.checkIn);
    return checkInDate >= today;
  };

  const nights = calculateNights();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="md:flex">
        {/* Property Image */}
        <div className="md:w-48 h-48 md:h-auto bg-gray-200 flex-shrink-0">
          {booking.propertyId.images && booking.propertyId.images.length > 0 ? (
            <Image
              src={booking.propertyId.images[0]}
              alt={booking.propertyId.title}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Booking Details */}
        <div className="p-6 flex-1">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {booking.propertyId.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {booking.propertyId.location.city},{" "}
                {booking.propertyId.location.state},{" "}
                {booking.propertyId.location.country}
              </p>
              <p className="text-sm text-gray-500">
                Booking ID: #{booking._id.slice(-8)}
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

          {/* Booking Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Check-in
              </div>
              <div className="text-base font-semibold text-gray-900">
                {formatDate(booking.checkIn)}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Check-out
              </div>
              <div className="text-base font-semibold text-gray-900">
                {formatDate(booking.checkOut)}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Duration
              </div>
              <div className="text-base font-semibold text-gray-900">
                {nights} {nights === 1 ? "night" : "nights"}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Guests
              </div>
              <div className="text-base font-semibold text-gray-900">
                {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="flex flex-col">
              <div className="text-lg font-bold text-green-600">
                ₹ {booking.totalPrice.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                Booked on {formatDate(booking.createdAt)}
              </div>
            </div>

            <div className="flex space-x-2">
              {isUpcoming() && booking.status.toLowerCase() !== "cancelled" && (
                <Link
                  href={`/property/${booking.propertyId._id}`}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              )}
              {booking.status.toLowerCase() === "completed" && (
                <Link
                  href={`/property/${booking.propertyId._id}`}
                  className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
                >
                  Book Again
                </Link>
              )}
              {isUpcoming() &&
                booking.status.toLowerCase() === "pending" &&
                handleCancelledBooking && (
                  <button
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log(
                        "Cancel button clicked for booking:",
                        booking._id
                      );
                      handleCancelledBooking(booking);
                    }}
                  >
                    Cancel
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;
