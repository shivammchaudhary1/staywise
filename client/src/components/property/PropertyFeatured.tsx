"use client";
import React, { useEffect, useState } from "react";
import { getAllProperties } from "@/apis/propertyService";
import Image from "next/image";
import Loader from "@/components/common/Loader";
import { PropertyAPIResponse } from "@/types/property";
import Link from "next/link";
import { formatPrice } from "@/utils/bookingUtils";

const PropertyFeatured = () => {
  const [data, setData] = useState<PropertyAPIResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const properties = await getAllProperties({
          page: 1,
          limit: 6,
          sortByPrice: "desc",
        });

        setData(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Properties
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder for PropertyCard components */}
              {data?.properties.map((i) => (
                <Link href={`/property/${i._id}`} key={i._id}>
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={i.images[0]}
                        alt={i.title}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{i.title}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 mb-2">{i.location.city}</p>
                      <p className="text-blue-600 font-bold">
                        {formatPrice(i.pricePerNight)}/night
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertyFeatured;
