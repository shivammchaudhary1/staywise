"use client";

import React, { useState, useEffect } from "react";
import BookingForm from "@/components/booking/BookingForm";
import {
  BookingValidationState,
  BookingPriceBreakdown,
  BookingRequest,
} from "@/types/booking";
import {
  validateCheckInDate,
  validateCheckOutDate,
  calculateNumberOfNights,
  calculateTotalPrice,
} from "@/utils/bookingUtils";
import { createBooking } from "@/apis/bookingService";
import { useAuth } from "@/store/authContext";

const CreateBooking = () => {
  // Get auth context
  const { getToken } = useAuth();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [validation, setValidation] = useState<BookingValidationState>({
    checkIn: true,
    checkOut: true,
  });
  const [priceBreakdown, setPriceBreakdown] = useState<BookingPriceBreakdown>({
    subtotal: 0,
    gst: 0,
    total: 0,
    numberOfNights: 0,
  });

  // Mock data - in real app, this would come from props or URL params
  const pricePerNight = 5000; // Example price
  const propertyId = "property-123"; // Example property ID

  const validateDates = () => {
    if (!checkIn || !checkOut) return false;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const isValidCheckIn = validateCheckInDate(checkInDate);
    const isValidCheckOut = validateCheckOutDate(checkInDate, checkOutDate);

    setValidation({
      checkIn: isValidCheckIn,
      checkOut: isValidCheckOut,
    });

    return isValidCheckIn && isValidCheckOut;
  };

  const updatePriceBreakdown = () => {
    if (!checkIn || !checkOut) return;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (validateDates()) {
      const nights = calculateNumberOfNights(checkInDate, checkOutDate);
      const { subtotal, gst, total } = calculateTotalPrice(
        pricePerNight,
        nights,
        guests
      );

      setPriceBreakdown({
        subtotal,
        gst,
        total,
        numberOfNights: nights,
      });
    }
  };

  useEffect(() => {
    updatePriceBreakdown();
  }, [checkIn, checkOut, guests]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateDates()) {
      const bookingData: BookingRequest = {
        propertyId,
        checkIn: new Date(checkIn).toISOString(),
        checkOut: new Date(checkOut).toISOString(),
        guests,
        totalPrice: priceBreakdown.total,
      };

      try {
        console.log("Creating booking with data:", bookingData);

        // Get token from AuthContext
        const token = getToken();

        if (!token) {
          console.error("No authentication token found");
          // Handle authentication error (redirect to login, show error, etc.)
          return;
        }

        const response = await createBooking(bookingData, token);
        console.log("Booking created successfully:", response);
        // Handle success (redirect, show success message, etc.)
      } catch (error) {
        console.error("Error creating booking:", error);
        // Handle error (show error message, etc.)
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create Booking</h1>
        <BookingForm
          pricePerNight={pricePerNight}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          validation={validation}
          priceBreakdown={priceBreakdown}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
          onGuestsChange={setGuests}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateBooking;
