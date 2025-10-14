"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import styles from "@/styles/auth.module.css";
import Image from "next/image";
import { login as loginService } from "@/api/services/authService";
import { useAuth } from "@/context/AuthContext";
import PublicRoute from "@/components/auth/PublicRoute";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginService(formData);
      console.log("Login successful:", response);

      // Update auth context
      login(response.user, response.token);

      // Redirect to property page
      router.push("/property");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicRoute>
      <section className="relative h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/assets/hero-image-3.jpg"
          alt="Hero background"
          fill
          // width={400}
          // height={300}
          className="object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sign In</h1>
        </div>
      </section>

      {/* form section */}
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${styles.input} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`${styles.input} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </PublicRoute>
  );
};

export default Login;
