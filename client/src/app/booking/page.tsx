"use client";
import React, { useState } from "react";
import BookingCard from "@/components/booking/BookingCard";

const BookingPage = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Manage and view all your property bookings
          </p>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-500">You haven't made any bookings yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {bookings.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Booking Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {bookings.filter((b) => b.status === "confirmed").length}
                </div>
                <div className="text-sm text-gray-600">Confirmed Bookings</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {bookings.filter((b) => b.status === "pending").length}
                </div>
                <div className="text-sm text-gray-600">Pending Bookings</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-green-600">
                  $
                  {bookings
                    .reduce((sum, b) => sum + b.totalPrice, 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
