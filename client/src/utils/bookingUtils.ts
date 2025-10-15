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
): { subtotal: number; gst: number; total: number } => {
  const basePrice = pricePerNight * numberOfNights;
  // Add surcharge for additional guests (optional, can be modified based on requirements)
  const guestSurcharge =
    numberOfGuests > 2 ? (numberOfGuests - 2) * 500 * numberOfNights : 0;
  const subtotal = basePrice + guestSurcharge;

  // Calculate GST (18%)
  const gst = subtotal * 0.18;

  // Calculate total including GST
  const total = subtotal + gst;

  return {
    subtotal,
    gst,
    total,
  };
};

export const formatPrice = (amount: number): string => {
  return `₹${amount.toLocaleString("en-IN")}`;
};
