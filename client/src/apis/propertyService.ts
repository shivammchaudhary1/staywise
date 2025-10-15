import { API_URL } from "./apiURL";
import {
  PropertyAPIResponse,
  SinglePropertyResponse,
  PropertyFormData,
} from "@/types/property";

export interface PropertyQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortByPrice?: "asc" | "desc";
}

export const getAllProperties = async (params?: PropertyQueryParams) => {
  try {
    // Build query string from parameters
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.sortByPrice)
      queryParams.append("sortByPrice", params.sortByPrice);

    const queryString = queryParams.toString();
    const url = queryString
      ? `${API_URL}/properties?${queryString}`
      : `${API_URL}/properties`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const getPropertyById = async (
  propertyId: string
): Promise<SinglePropertyResponse> => {
  try {
    const response = await fetch(`${API_URL}/properties/${propertyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch property");
    }
    const data = await response.json();
    return data as SinglePropertyResponse;
  } catch (error) {
    console.error("Error fetching property:", error);
    throw error;
  }
};

export const addProperty = async (
  propertyData: PropertyFormData,
  token: string
) => {
  try {
    const response = await fetch(`${API_URL}/properties/add`, {
      method: "POST",
      body: JSON.stringify(propertyData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to add property");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding property:", error);
    throw error;
  }
};
