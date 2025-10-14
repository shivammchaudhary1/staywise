import React, { useState } from "react";

const SeeAllBooking = () => {
  // Sample booking data based on your schema
  const [bookings] = useState([
    {
      _id: "68eceff4d084799714225f44",
      userId: "68eceb49e82786aedaa0e915",
      propertyId: "68ecee0c7595ee2e83eb9472",
      checkIn: new Date("2025-10-15T00:00:00.000Z"),
      checkOut: new Date("2025-10-16T00:00:00.000Z"),
      guests: 2,
      totalPrice: 9980,
      status: "confirmed",
      createdAt: new Date("2025-10-13T12:26:28.606Z"),
      updatedAt: new Date("2025-10-13T12:26:28.606Z"),
    },
    {
      _id: "68eceff4d084799714225f45",
      userId: "68eceb49e82786aedaa0e916",
      propertyId: "68ecee0c7595ee2e83eb9473",
      checkIn: new Date("2025-10-20T00:00:00.000Z"),
      checkOut: new Date("2025-10-22T00:00:00.000Z"),
      guests: 4,
      totalPrice: 15960,
      status: "pending",
      createdAt: new Date("2025-10-13T10:15:20.420Z"),
      updatedAt: new Date("2025-10-13T10:15:20.420Z"),
    },
    {
      _id: "68eceff4d084799714225f46",
      userId: "68eceb49e82786aedaa0e917",
      propertyId: "68ecee0c7595ee2e83eb9474",
      checkIn: new Date("2025-10-25T00:00:00.000Z"),
      checkOut: new Date("2025-10-28T00:00:00.000Z"),
      guests: 1,
      totalPrice: 7480,
      status: "cancelled",
      createdAt: new Date("2025-10-12T14:30:45.123Z"),
      updatedAt: new Date("2025-10-12T16:45:30.789Z"),
    },
  ]);

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Booking Management
      </h1>

      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No bookings found.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Booking #{booking._id.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Property ID: {booking.propertyId.slice(-8)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Check-in</p>
                  <p className="text-gray-800">{formatDate(booking.checkIn)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Check-out</p>
                  <p className="text-gray-800">
                    {formatDate(booking.checkOut)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Guests</p>
                  <p className="text-gray-800">{booking.guests}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Price
                  </p>
                  <p className="text-gray-800 font-semibold">
                    ${booking.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t">
                <span>User ID: {booking.userId.slice(-8)}</span>
                <span>Created: {formatDate(booking.createdAt)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SeeAllBooking;
