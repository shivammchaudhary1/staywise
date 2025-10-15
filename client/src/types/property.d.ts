export interface Property {
  _id: string;
  userId: string;
  title: string;
  description: string;
  pricePerNight: number;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PropertyAPIResponse {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProperties: number;
    perPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    search: string;
    sortByPrice: string;
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

export interface PropertyFormData {
  title: string;
  description: string;
  pricePerNight: number;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  images: string[];
}
