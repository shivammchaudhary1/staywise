import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";

const PropertyPage = () => {
  const data = [
    {
      _id: "68ecebc9e82786aedaa0e919",
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
    },
    {
      _id: "68ecebc9e82786aedaa0e919",
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
    },
    {
      _id: "68ecebc9e82786aedaa0e919",
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
    },
    {
      _id: "68ecebc9e82786aedaa0e919",
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
    },
    {
      _id: "68ecebc9e82786aedaa0e919",
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
    },
  ];

  return (
    <>
      <div className="border-2 p-2 m-5  flex border-gray-300 rounded-lg bg-[var(--text-color-two)]">
        {/* left  */}
        <div className="w-[20vw] p-4 m-2 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Sort by Price
          </h2>

          {/* Sorting Options */}
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priceSort"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-3 text-gray-700">Default</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priceSort"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700">Price: Low to High</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priceSort"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700">Price: High to Low</span>
            </label>
          </div>
        </div>
        {/* right  */}
        <div className=" w-[80vw] p-2 m-2">
          {/* search container */}
          <div className="border-2 border-dashed border-gray-300 p-2 flex gap-4">
            <input
              type="text"
              placeholder="Search"
              className="border bg-white border-gray-300 p-2 w-auto rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] flex-grow"
            />
            <Button>Search</Button>
          </div>

          {/* pagination */}
          <div className="flex justify-between items-center mt-4 mb-4 p-4 bg-gray-50 rounded-md">
            <div className="text-sm text-gray-600">
              Showing 1-5 of 15 properties
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                2
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                3
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                Next
              </button>
            </div>
          </div>

          {/* property list container */}
          <div className="h-[calc(100vh-300px)] overflow-y-auto pr-2">
            <div className="space-y-4">
              {data.map((property, index) => (
                <div
                  key={`${property._id}-${index}`}
                  className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Property Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        width={200}
                        height={150}
                        className="rounded-lg object-cover"
                      />
                    </div>

                    {/* Property Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {property.title}
                        </h2>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            ₹{property.pricePerNight}
                          </div>
                          <div className="text-sm text-gray-500">per night</div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {property.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
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

                        <Button>View Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
