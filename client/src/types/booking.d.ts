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
  subtotal: number;
  gst: number;
  total: number;
  numberOfNights: number;
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
