export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  success: boolean;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    createdAt: string;
    updatedAt: string;
  };
}

export interface ApiError {
  message: string;
  success: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface authContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  getToken: () => string | null;
}
