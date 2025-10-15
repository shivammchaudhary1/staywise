import React from "react";
import Loader from "@/components/common/Loader";
import { BookingFormProps } from "@/types/booking";
import { formatPrice } from "@/utils/bookingUtils";

const BookingForm: React.FC<BookingFormProps> = ({
  pricePerNight,
  checkIn,
  checkOut,
  guests,
  validation,
  priceBreakdown,
  isLoading = false,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900">
          {priceBreakdown.pricePerNightWithPersons > 0
            ? formatPrice(priceBreakdown.pricePerNightWithPersons)
            : formatPrice(pricePerNight)}
        </div>
        <div className="text-gray-600">
          per night {guests > 1 && `(for ${guests} guests)`}
        </div>
        {guests > 1 && (
          <div className="text-sm text-gray-500 mt-1">
            Base: {formatPrice(pricePerNight)} +{" "}
            {formatPrice((guests - 1) * 700)} for extra guests
          </div>
        )}
      </div>

      <form onSubmit={onSubmit}>
        {/* Check-in/Check-out */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-gray-300 rounded-lg p-3">
              <label className="block text-xs text-gray-600 mb-1">
                CHECK-IN
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => onCheckInChange(e.target.value)}
                className={`w-full text-sm focus:outline-none ${
                  !validation.checkIn ? "border-red-500" : ""
                }`}
                min={new Date().toISOString().split("T")[0]}
                required
              />
              {!validation.checkIn && (
                <p className="text-red-500 text-xs mt-1">
                  Check-in date must be today or later
                </p>
              )}
            </div>
            <div className="border border-gray-300 rounded-lg p-3">
              <label className="block text-xs text-gray-600 mb-1">
                CHECK-OUT
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => onCheckOutChange(e.target.value)}
                className={`w-full text-sm focus:outline-none ${
                  !validation.checkOut ? "border-red-500" : ""
                }`}
                min={checkIn || new Date().toISOString().split("T")[0]}
                required
              />
              {!validation.checkOut && (
                <p className="text-red-500 text-xs mt-1">
                  Check-out date must be after check-in
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="mb-6">
          <div className="border border-gray-300 rounded-lg p-3">
            <label className="block text-xs text-gray-600 mb-1">GUESTS</label>
            <select
              value={guests}
              onChange={(e) => onGuestsChange(Number(e.target.value))}
              className="w-full text-sm focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} guest{num !== 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          {guests > 1 && (
            <div className="text-xs text-gray-500 mt-1 px-1">
              💡 Extra guests: +₹700 per person per night
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        {priceBreakdown.numberOfNights > 0 && (
          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">
                {formatPrice(pricePerNight)} x {priceBreakdown.numberOfNights}{" "}
                nights
              </span>
              <span>{formatPrice(priceBreakdown.basePrice)}</span>
            </div>

            {/* Show person charges if more than 1 guest */}
            {guests > 1 && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">
                  Additional guests ({guests - 1} x ₹700 x{" "}
                  {priceBreakdown.numberOfNights} nights)
                </span>
                <span>{formatPrice(priceBreakdown.personCharges)}</span>
              </div>
            )}

            <div className="border-t pt-2 mb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">
                  Subtotal (before GST)
                </span>
                <span className="font-medium">
                  {formatPrice(priceBreakdown.subtotal)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">GST (18%)</span>
              <span>{formatPrice(priceBreakdown.gst)}</span>
            </div>

            <div className="border-t pt-2 flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(priceBreakdown.total)}</span>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center mb-4">
            <Loader />
          </div>
        )}

        {/* Book Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!validation.checkIn || !validation.checkOut || isLoading}
        >
          {isLoading ? "Booking..." : "Book Now"}
        </button>

        <div className="text-center text-sm text-gray-600">
          You won't be charged yet
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
