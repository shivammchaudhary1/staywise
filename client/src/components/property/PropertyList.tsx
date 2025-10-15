import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import Link from "next/link";
import { PropertyAPIResponse } from "@/types/property";
import { formatPrice } from "@/utils/bookingUtils";

const PropertyList = ({ data }: { data: PropertyAPIResponse | null }) => {
  if (!data?.properties || data.properties.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 gap-4 p-4">
        {data.properties.map((property, index) => (
          <div
            key={`${property._id}-${index}`}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Property Image */}
              <div className="flex-shrink-0">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  width={280}
                  height={200}
                  className="w-full sm:w-[280px] h-[200px] rounded-lg object-cover"
                />
              </div>

              {/* Property Details */}
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
                    {property.title}
                  </h2>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(property.pricePerNight)}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {property.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {property.location.city}, {property.location.state},{" "}
                      {property.location.country}
                    </span>
                  </div>
                  <Link href={`/property/${property._id}`}>
                    <Button>View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
