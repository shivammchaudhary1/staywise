import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ApiError,
} from "../types/auth.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to handle API responses
const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};

// Login function
export const login = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await handleApiResponse(response);

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Login failed");
  }
};

// Register function
export const register = async (
  userData: RegisterRequest
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await handleApiResponse(response);

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Registration failed"
    );
  }
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get stored token
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Get stored user
export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};
