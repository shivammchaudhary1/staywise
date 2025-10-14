"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, authContextType } from "@/types/auth";

const AuthContext = createContext<authContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const storedToken = localStorage.getItem("staywise-token");
      const storedUser = localStorage.getItem("staywise-user");

      if (storedToken && storedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("staywise-token");
    localStorage.removeItem("staywise-user");
  };

  const getToken = (): string | null => {
    return localStorage.getItem("staywise-token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// usage

// import { useAuth } from "@/store/authContext";
// const { isAuthenticated, user, loading, login, logout } = useAuth();
