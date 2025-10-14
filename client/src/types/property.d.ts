export interface PropertyAPIResponse {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProperties: number;
    perPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  success: boolean;
  message: string;
  properties: Property[];
}

export interface SinglePropertyResponse {
  message: string;
  success: boolean;
  property: {
    location: {
      address: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    _id: string;
    userId: string;
    title: string;
    description: string;
    pricePerNight: number;
    images: string[];
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

// {
//     "message": "Property retrieved successfully",
//     "success": true,
//     "property": {
//         "location": {
//             "address": "Outer Ring Road",
//             "city": "Bengaluru",
//             "state": "Bengaluru",
//             "country": "India",
//             "zipCode": "400001"
//         },
//         "_id": "68ecec68e82786aedaa0e91b",
//         "userId": "68ecea42e82786aedaa0e900",
//         "title": "Hilton Bengaluru Embassy Manyata Business Park",
//         "description": "Free Cancellation till 4 hrs before check in",
//         "pricePerNight": 7800,
//         "images": [
//             "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202203251031111024-2185f03afe8211ecab0a0a58a9feac02.jpg?&output-quality=75&downsize=583:388&crop=583:388;4,0&output-format=jpg",
//             "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202203251031111024-2185f03afe8211ecab0a0a58a9feac02.jpg?&output-quality=75&downsize=583:388&crop=583:388;4,0&output-format=jpg",
//             "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202203251031111024-0989f55cc23d11ec88930a58a9feac02.jpg?&output-quality=75&downsize=583:388&crop=583:388;24,0&output-format=jpg",
//             "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202203251031111024-1ebdede8c23d11ec89ed0a58a9feac02.jpg?&output-quality=75&downsize=583:388&crop=583:388;103,0&output-format=jpg"
//         ],
//         "createdAt": "2025-10-13T12:11:20.927Z",
//         "updatedAt": "2025-10-13T12:11:20.927Z"
//     }
