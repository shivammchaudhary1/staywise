"use client";
import React, { useEffect, useState, useCallback } from "react";
import { getAllProperties, PropertyQueryParams } from "@/apis/propertyService";
import { PropertyAPIResponse } from "@/types/property";
import PropertyList from "@/components/property/PropertyList";
import SearchAndFilter from "@/components/property/SearchAndFilter";
import Pagination from "@/components/property/Pagination";
import Loader from "@/components/common/Loader";

const PropertyPage = () => {
  const [data, setData] = useState<PropertyAPIResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortByPrice, setSortByPrice] = useState<"asc" | "desc" | "">("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [appliedFilters, setAppliedFilters] = useState<PropertyQueryParams>({
    page: 1,
    limit: 10,
  });

  const fetchProperties = useCallback(async (params: PropertyQueryParams) => {
    setIsLoading(true);
    try {
      const properties = await getAllProperties(params);
      setData(properties);
      setError(null);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError("Failed to load properties. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProperties(appliedFilters);
  }, [fetchProperties, appliedFilters]);

  // Handler functions
  const handleSearch = () => {
    const newFilters = {
      ...appliedFilters,
      search: searchTerm.trim() || undefined,
      sortByPrice: sortByPrice || undefined,
      page: 1, // Reset to first page when searching
    };
    setCurrentPage(1);
    setAppliedFilters(newFilters);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSortByPrice("");
    setCurrentPage(1);
    const resetFilters = {
      page: 1,
      limit: 10,
    };
    setAppliedFilters(resetFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = {
      ...appliedFilters,
      page,
    };
    setCurrentPage(page);
    setAppliedFilters(newFilters);

    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Properties
          </h1>
          <p className="text-gray-600">
            Discover amazing places to stay for your next adventure
          </p>
        </div>

        {/* Search and Filter Section */}
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortByPrice={sortByPrice}
          onSortByPriceChange={setSortByPrice}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {/* Results Summary */}
        {data && (
          <div className="mb-4">
            <div className="text-sm text-gray-600">
              {data.pagination.totalProperties > 0 ? (
                <>
                  Found{" "}
                  <span className="font-semibold">
                    {data.pagination.totalProperties}
                  </span>{" "}
                  properties
                  {appliedFilters.search && (
                    <>
                      {" "}
                      matching "
                      <span className="font-semibold">
                        {appliedFilters.search}
                      </span>
                      "
                    </>
                  )}
                </>
              ) : (
                <>
                  No properties found
                  {appliedFilters.search && (
                    <>
                      {" "}
                      for "
                      <span className="font-semibold">
                        {appliedFilters.search}
                      </span>
                      "
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Property List */}
        {data && data.pagination.totalProperties > 0 ? (
          <>
            <PropertyList data={data} />

            {/* Pagination */}
            <Pagination
              currentPage={data.pagination.currentPage}
              totalPages={data.pagination.totalPages}
              totalProperties={data.pagination.totalProperties}
              perPage={data.pagination.perPage}
              hasNextPage={data.pagination.hasNextPage}
              hasPrevPage={data.pagination.hasPrevPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {appliedFilters.search
                ? "No properties match your search criteria"
                : "No properties available"}
            </div>
            {appliedFilters.search && (
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;
