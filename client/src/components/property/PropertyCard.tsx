import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SinglePropertyResponse } from "@/types/property";
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

const PropertyCard = ({
  selectedImageIndex,
  setSelectedImageIndex,
  data,
}: {
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  data: SinglePropertyResponse["property"];
}) => {
  // Get auth context
  const { getToken } = useAuth();

  // Booking form state management
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
        data.pricePerNight,
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
        propertyId: data._id,
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

        // Reset form after successful booking
        setCheckIn("");
        setCheckOut("");
        setGuests(1);

        // You can add success notification here
        alert("Booking created successfully!");
      } catch (error) {
        console.error("Error creating booking:", error);
        // Handle error (show error message, etc.)
        alert("Error creating booking. Please try again.");
      }
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button className="text-blue-600 hover:text-blue-800 mb-2 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Properties
            </button>
            <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {data.location.address}, {data.location.city},{" "}
              {data.location.state}, {data.location.country}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Images and Details */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="mb-4">
                <Image
                  src={data?.images[selectedImageIndex]}
                  alt={data?.title}
                  width={800}
                  height={500}
                  className="w-full h-[400px] object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2 mb-8">
                {data?.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-16 rounded-md overflow-hidden ${
                      selectedImageIndex === index ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${data?.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Property Description */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                  About this property
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {data?.description}
                </p>
              </div>

              {/*Static Amenities */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Private Pool</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Beach Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Air Conditioning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Kitchen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Parking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Booking Card */}
            <div className="lg:col-span-1">
              <BookingForm
                pricePerNight={data.pricePerNight}
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
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
