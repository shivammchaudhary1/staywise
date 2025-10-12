export interface propertyModel {
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
  createdAt: Date;
  updatedAt: Date;
}
