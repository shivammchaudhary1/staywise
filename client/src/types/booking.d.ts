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
