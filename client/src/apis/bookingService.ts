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

export const getUserUpcomingBookings = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/booking/user-bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("User upcoming bookings data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user upcoming bookings:", error);
    throw error;
  }
};

export const getUserHistory = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/booking/user-history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user history:", error);
    throw error;
  }
};

export const updateStatus = async (
  bookingId: string,
  status: string,
  token: string
) => {
  try {
    const response = await fetch(`${API_URL}/booking/status/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update booking status");
    }

    return data;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};
