export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  numberOfGuests: number;
  status: "upcoming" | "completed" | "pending";
}

export interface BookingData {
  _id: string;
  userId: string;
  propertyId: {
    _id: string;
    title: string;
    location: {
      address: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    images?: string[];
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyBookingCardProps {
  booking: BookingData;
  handleCancelledBooking?: (booking: BookingData) => Promise<void>;
}

export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface BookingValidationState {
  checkIn: boolean;
  checkOut: boolean;
}

export interface BookingPriceBreakdown {
  basePrice: number;
  personCharges: number;
  subtotal: number;
  gst: number;
  total: number;
  numberOfNights: number;
  pricePerNightWithPersons: number;
}

export interface BookingFormProps {
  pricePerNight: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  validation: BookingValidationState;
  priceBreakdown: BookingPriceBreakdown;
  isLoading?: boolean;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
  onGuestsChange: (value: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface BookingRequest {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
}

export interface BookingResponse {
  message: string;
  success: boolean;
  booking: {
    _id: string;
    userId: string;
    propertyId: {
      _id: string;
      name: string;
      location: string;
      pricePerNight: number;
      image?: string;
      [key: string]: any;
    };
  }[];
}
