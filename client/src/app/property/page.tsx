"use client";
import React, { useEffect, useState } from "react";
import { getAllProperties } from "@/apis/propertyService";
import { PropertyAPIResponse } from "@/types/property";
import PropertyList from "@/components/property/PropertyList";
import Loader from "@/components/common/Loader";

const PropertyPage = () => {
  const [data, setData] = useState<PropertyAPIResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const properties = await getAllProperties();
        setData(properties);
        setError(null);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <>
      <PropertyList data={data} />
    </>
  );
};

export default PropertyPage;
