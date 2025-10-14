"use client";
import React, { useState, useEffect } from "react";
import { getPropertyById } from "@/apis/propertyService";
import PropertyCard from "@/components/property/PropertyCard";
import { SinglePropertyResponse } from "@/types/property";
import { useParams } from "next/navigation";

const PropertyDetails = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [data, setData] = useState<SinglePropertyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const propertyId = params.propertyId as string;

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

  console.log("Property Data:", data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Property not found</div>;
  }

  return (
    <PropertyCard
      selectedImageIndex={selectedImageIndex}
      setSelectedImageIndex={setSelectedImageIndex}
      data={data.property}
    />
  );
};

export default PropertyDetails;
