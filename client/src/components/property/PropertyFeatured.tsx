import React from "react";
import Image from "next/image";

const PropertyFeatured = () => {
  const data = [
    {
      _id: "68ecec68e82786aedaa0e91b",

      title: "Hilton Bengaluru Embassy Manyata Business Park",
      description: "Free Cancellation till 4 hrs before check in",
      pricePerNight: 7800,
      location: {
        address: "Outer Ring Road",
        city: "Bengaluru",
        state: "Bengaluru",
        country: "India",
        zipCode: "400001",
      },
      images: [
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202203251031111024-2185f03afe8211ecab0a0a58a9feac02.jpg?&output-quality=75&downsize=583:388&crop=583:388;4,0&output-format=jpg",
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202203251031111024-2185f03afe8211ecab0a0a58a9feac02.jpg?&output-quality=75&downsize=583:388&crop=583:388;4,0&output-format=jpg",
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202203251031111024-0989f55cc23d11ec88930a58a9feac02.jpg?&output-quality=75&downsize=583:388&crop=583:388;24,0&output-format=jpg",
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202203251031111024-1ebdede8c23d11ec89ed0a58a9feac02.jpg?&output-quality=75&downsize=583:388&crop=583:388;103,0&output-format=jpg",
      ],
      createdAt: {
        $date: "2025-10-13T12:11:20.927Z",
      },
      updatedAt: {
        $date: "2025-10-13T12:11:20.927Z",
      },
    },
    {
      _id: "68eced777595ee2e83eb9466",
      title: "Octave Kanthi Comforts",
      description: "Couple Friendly",
      pricePerNight: 1375,
      location: {
        address: "Gandhi Nagar",
        city: "Bengaluru",
        state: "Karnataka",
        country: "India",
        zipCode: "400001",
      },
      images: [
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201605131430223672-995f8e90dc0011eba7770242ac110002.jpg?&output-quality=75&downsize=583:388&output-format=webp",
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201605131430223672-9a4e046cdc0011eb87fd0242ac110002.jpg?&output-quality=75&downsize=583:388&output-format=webp",
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201605131430223672-d8d61b58dbff11eb95ca0242ac110007.jpg?&output-quality=75&downsize=583:388&output-format=webp",
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201605131430223672-29b4c0b0dc0011ebba220242ac110007.jpg?&output-quality=75&downsize=583:388&output-format=webp",
      ],
      createdAt: {
        $date: "2025-10-13T12:15:51.462Z",
      },
      updatedAt: {
        $date: "2025-10-13T12:15:51.462Z",
      },
    },
    {
      _id: "68eced867595ee2e83eb9468",
      title: "Octave Himalaya Monarch",
      description: "Couple Friendly",
      pricePerNight: 1575,
      location: {
        address: "Gandhi Nagar",
        city: "Bengaluru",
        state: "Karnataka",
        country: "India",
        zipCode: "400001",
      },
      images: [
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201409221814048475-f7ec87969dee11ec9bf70a58a9feac02.jpg?&output-quality=75&downsize=583:388&output-format=webp",
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201409221814048475-c4c987e2b1f611e9b3e10242ac140005.jpg?&output-quality=75&downsize=583:388&crop=583:388;0,24&output-format=webp",
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201409221814048475-f9d3920c9dee11ecb4890a58a9feac02.jpg?&output-quality=75&downsize=583:388&output-format=webp",
        "https://r1imghtlak.mmtcdn.com/87ee93a8b1f611e9b3e10242ac140005.jpg?&output-quality=75&downsize=583:388&crop=583:388;0,24&output-format=webp",
      ],
      createdAt: {
        $date: "2025-10-13T12:16:06.326Z",
      },
      updatedAt: {
        $date: "2025-10-13T12:16:06.326Z",
      },
    },
  ];
  return (
    <>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for PropertyCard components */}
            {data?.map((i) => (
              <div key={i._id} className="bg-white rounded-lg shadow-md p-4">
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
                <p className="text-gray-600 mb-2">
                  Location {i.location.city}, {i.location.state}
                </p>
                <p className="text-blue-600 font-bold">
                  ₹{i.pricePerNight}/night
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyFeatured;
