"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const PropertyDetails = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const data = {
    _id: "68ecebc9e82786aedaa0e91",
    userId: "68ecea42e82786aedaa0e900",
    title: "Luxury Beachside Villa",
    description:
      "A beautiful 3-bedroom villa with private pool and direct beach access. Perfect for a relaxing vacation.",
    pricePerNight: 1900,
    location: {
      address: "12 Palm Street",
      city: "Goa",
      state: "Goa",
      country: "India",
      zipCode: "403001",
    },
    images: [
      "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201802241526105449-76b20e2613c311e88dbe0a9df65c8753.jpg?&output-quality=75&downsize=583:388&output-format=jpg",
      "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201802241526105449-76b20e2613c311e88dbe0a9df65c8753.jpg?&output-quality=75&downsize=583:388&output-format=jpg",
      "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201802241526105449-61fa810213c311e8867a0a9df65c8753.jpg?&output-quality=75&downsize=583:388&crop=583:388;86,0&output-format=jpg",
      "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201802241526105449-4618b92c13c311e8afa70a9df65c8753.jpg?&output-quality=75&downsize=583:388&output-format=jpg",
    ],
  };

  return (
    <ProtectedRoute>
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
                  src={data.images[selectedImageIndex]}
                  alt={data.title}
                  width={800}
                  height={500}
                  className="w-full h-[400px] object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2 mb-8">
                {data.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-16 rounded-md overflow-hidden ${
                      selectedImageIndex === index ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${data.title} ${index + 1}`}
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
                  {data.description}
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
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    ₹{data.pricePerNight.toLocaleString()}
                  </div>
                  <div className="text-gray-600">per night</div>
                </div>

                {/* Check-in/Check-out */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-gray-300 rounded-lg p-3">
                      <label className="block text-xs text-gray-600 mb-1">
                        CHECK-IN
                      </label>
                      <input
                        type="date"
                        className="w-full text-sm focus:outline-none"
                      />
                    </div>
                    <div className="border border-gray-300 rounded-lg p-3">
                      <label className="block text-xs text-gray-600 mb-1">
                        CHECK-OUT
                      </label>
                      <input
                        type="date"
                        className="w-full text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div className="mb-6">
                  <div className="border border-gray-300 rounded-lg p-3">
                    <label className="block text-xs text-gray-600 mb-1">
                      GUESTS
                    </label>
                    <select className="w-full text-sm focus:outline-none">
                      <option>1 guest</option>
                      <option>2 guests</option>
                      <option>3 guests</option>
                      <option>4 guests</option>
                      <option>5 guests</option>
                      <option>6 guests</option>
                    </select>
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                  Book Now
                </button>

                <div className="text-center text-sm text-gray-600 mb-4">
                  You won't be charged yet
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">
                      ₹{data.pricePerNight.toLocaleString()} x 5 nights
                    </span>
                    <span>₹{(data.pricePerNight * 5).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Service fee</span>
                    <span>₹500</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center font-semibold">
                    <span>Total</span>
                    <span>
                      ₹{(data.pricePerNight * 5 + 500).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PropertyDetails;
