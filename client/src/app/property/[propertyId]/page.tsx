"use client";
import React, { useState, useEffect } from "react";
import { getPropertyById } from "@/apis/propertyService";
import { createBooking } from "@/apis/bookingService";
import PropertyCard from "@/components/property/PropertyCard";
import Loader from "@/components/common/Loader";
import { SinglePropertyResponse } from "@/types/property";
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
import { useAuth } from "@/store/authContext";
import { useParams } from "next/navigation";
import { notify } from "@/utils/notification";
import { useRouter } from "next/navigation";

const PropertyDetails = () => {
  // Property data state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [data, setData] = useState<SinglePropertyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // router for navigation
  const router = useRouter();

  // Booking state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [validation, setValidation] = useState<BookingValidationState>({
    checkIn: true,
    checkOut: true,
  });
  const [priceBreakdown, setPriceBreakdown] = useState<BookingPriceBreakdown>({
    basePrice: 0,
    personCharges: 0,
    subtotal: 0,
    gst: 0,
    total: 0,
    numberOfNights: 0,
    pricePerNightWithPersons: 0,
  });
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  const params = useParams();
  const propertyId = params.propertyId as string;
  const { getToken } = useAuth();

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        const property = await getPropertyById(propertyId);
        setData(property);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  // Booking validation logic
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

  // Update price breakdown when dates/guests change
  const updatePriceBreakdown = () => {
    if (!checkIn || !checkOut || !data?.property?.pricePerNight) return;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (validateDates()) {
      const nights = calculateNumberOfNights(checkInDate, checkOutDate);
      const {
        basePrice,
        personCharges,
        subtotal,
        gst,
        total,
        pricePerNightWithPersons,
      } = calculateTotalPrice(data.property.pricePerNight, nights, guests);

      setPriceBreakdown({
        basePrice,
        personCharges,
        subtotal,
        gst,
        total,
        numberOfNights: nights,
        pricePerNightWithPersons,
      });
    }
  };

  useEffect(() => {
    updatePriceBreakdown();
  }, [checkIn, checkOut, guests, data?.property?.pricePerNight]);

  // Handle booking submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateDates()) return;

    const bookingData: BookingRequest = {
      propertyId: propertyId,
      checkIn: new Date(checkIn).toISOString(),
      checkOut: new Date(checkOut).toISOString(),
      guests,
      totalPrice: priceBreakdown.total,
    };

    try {
      setIsBookingLoading(true);
      // console.log("Creating booking with data:", bookingData);

      const token = getToken();
      if (!token) {
        console.error("No authentication token found");
        notify.error({ message: "You must be logged in to make a booking." });
        router.push("/auth/login");
        // alert("Please log in to make a booking");
        return;
      }

      const response = await createBooking(bookingData, token);

      // console.log("Booking created successfully:", response);

      // Reset form after successful booking
      setCheckIn("");
      setCheckOut("");
      setGuests(1);

      notify.success({ message: "Booking created successfully!" });
      router.push("/mybooking");
    } catch (error) {
      // console.error("Error creating booking:", error);
      notify.error({ message: "Error creating booking. Please try again." });
    } finally {
      setIsBookingLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return <div>Property not found</div>;
  }

  return (
    <PropertyCard
      selectedImageIndex={selectedImageIndex}
      setSelectedImageIndex={setSelectedImageIndex}
      data={data.property}
      // Booking props
      checkIn={checkIn}
      checkOut={checkOut}
      guests={guests}
      validation={validation}
      priceBreakdown={priceBreakdown}
      isBookingLoading={isBookingLoading}
      onCheckInChange={setCheckIn}
      onCheckOutChange={setCheckOut}
      onGuestsChange={setGuests}
      onBookingSubmit={handleBookingSubmit}
    />
  );
};

export default PropertyDetails;
