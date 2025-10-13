import Image from "next/image";
import React from "react";

const PropertyWhyChoose = () => {
  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose StayWise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Image
                  src="/window.svg"
                  alt="Best Prices"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Find the best deals and get unbeatable prices on amazing
                properties.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Image
                  src="/globe.svg"
                  alt="Wide Selection"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Choose from thousands of properties worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Image
                  src="/file.svg"
                  alt="Easy Booking"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Simple and secure booking process with instant confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyWhyChoose;
