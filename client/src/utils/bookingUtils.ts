export const validateCheckInDate = (checkInDate: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return checkInDate >= today;
};

export const validateCheckOutDate = (
  checkInDate: Date,
  checkOutDate: Date
): boolean => {
  return checkOutDate > checkInDate;
};

export const calculateNumberOfNights = (
  checkInDate: Date,
  checkOutDate: Date
): number => {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const diffDays = Math.round(
    Math.abs((checkOutDate.getTime() - checkInDate.getTime()) / oneDay)
  );
  return diffDays;
};

export const calculateTotalPrice = (
  pricePerNight: number,
  numberOfNights: number,
  numberOfGuests: number
): {
  basePrice: number;
  personCharges: number;
  subtotal: number;
  gst: number;
  total: number;
  pricePerNightWithPersons: number;
} => {
  // Base price for property (covers 1 person)
  const basePrice = pricePerNight * numberOfNights;

  // Additional charge for extra persons: ₹700 per additional person per night
  const personCharges =
    numberOfGuests > 1 ? (numberOfGuests - 1) * 700 * numberOfNights : 0;

  // Calculate price per night including person charges for display
  const pricePerNightWithPersons =
    pricePerNight + (numberOfGuests > 1 ? (numberOfGuests - 1) * 700 : 0);

  // Subtotal before GST
  const subtotal = basePrice + personCharges;

  // Calculate GST (18%) and round to avoid decimal precision issues
  const gst = Math.round(subtotal * 0.18);

  // Calculate total including GST
  const total = subtotal + gst;

  return {
    basePrice: Math.round(basePrice),
    personCharges: Math.round(personCharges),
    subtotal: Math.round(subtotal),
    gst: Math.round(gst),
    total: Math.round(total),
    pricePerNightWithPersons: Math.round(pricePerNightWithPersons),
  };
};

export const formatPrice = (amount: number): string => {
  // Round to avoid floating point precision issues and format for Indian currency
  const roundedAmount = Math.round(amount);
  return `₹${roundedAmount.toLocaleString("en-IN")}`;
};

export const getPriceBreakdownInfo = (guests: number): string => {
  if (guests === 1) return "Base price for 1 person";
  return `Base price + ₹${(guests - 1) * 700} for ${
    guests - 1
  } additional guest${guests - 1 > 1 ? "s" : ""}`;
};

// Utility function to ensure prices are always integers (Indian Rupees don't use decimals typically)
export const sanitizePrice = (price: number | string): number => {
  const numPrice =
    typeof price === "string" ? parseInt(price) : Math.round(price);
  return isNaN(numPrice) ? 0 : Math.max(0, numPrice);
};
