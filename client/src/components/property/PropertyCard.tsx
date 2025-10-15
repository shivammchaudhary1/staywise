import React from "react";
import Image from "next/image";
import { SinglePropertyResponse } from "@/types/property";
import { BookingValidationState, BookingPriceBreakdown } from "@/types/booking";
import BookingForm from "@/components/booking/BookingForm";

interface PropertyCardProps {
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  data: SinglePropertyResponse["property"];
  // Booking props passed from parent
  checkIn: string;
  checkOut: string;
  guests: number;
  validation: BookingValidationState;
  priceBreakdown: BookingPriceBreakdown;
  isBookingLoading: boolean;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
  onGuestsChange: (value: number) => void;
  onBookingSubmit: (e: React.FormEvent) => Promise<void>;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  selectedImageIndex,
  setSelectedImageIndex,
  data,
  checkIn,
  checkOut,
  guests,
  validation,
  priceBreakdown,
  isBookingLoading,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onBookingSubmit,
}) => {
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
                isLoading={isBookingLoading}
                onCheckInChange={onCheckInChange}
                onCheckOutChange={onCheckOutChange}
                onGuestsChange={onGuestsChange}
                onSubmit={onBookingSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
