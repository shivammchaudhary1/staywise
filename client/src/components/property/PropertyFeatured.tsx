import React from "react";

const PropertyFeatured = () => {
  return (
    <>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for PropertyCard components */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Luxury Hotel {i}</h3>
                <p className="text-gray-600 mb-2">Location {i}</p>
                <p className="text-blue-600 font-bold">$299/night</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyFeatured;
