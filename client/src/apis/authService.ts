import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ApiError,
  User,
} from "@/types/auth";

import { API_URL } from "./apiURL";

export const login = async (credentials: LoginRequest) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message);
    }

    const data: AuthResponse = await response.json();

    //save to local storage
    localStorage.setItem("staywise-token", data.token);
    localStorage.setItem("staywise-user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (userData: RegisterRequest) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.message);
    }

    const data: AuthResponse = await response.json();
    //save to local storage
    localStorage.setItem("staywise-token", data.token);
    localStorage.setItem("staywise-user", JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("staywise-token");
  localStorage.removeItem("staywise-user");
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("staywise-user");
  return user ? JSON.parse(user) : null;
};

export const getToken = (): string | null => {
  return localStorage.getItem("staywise-token");
};
