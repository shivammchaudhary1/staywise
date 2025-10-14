// Authentication request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

// Authentication response types
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName?: string;
    role: "user" | "admin";
  };
}

// Error response type
export interface ApiError {
  message: string;
  status?: number;
}

// User type for context
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  role: "user" | "admin";
}
