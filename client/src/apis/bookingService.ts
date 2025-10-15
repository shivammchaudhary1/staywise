import { API_URL } from "./apiURL";
import { BookingRequest } from "@/types/booking";

export const createBooking = async (
  bookingData: BookingRequest,
  token: string
) => {
  try {
    const response = await fetch(`${API_URL}/booking/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};
