"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import styles from "@/styles/auth.module.css";
import Image from "next/image";
import { register as registerUser } from "@/apis/authService";
import { useAuth } from "@/store/authContext";
import { notify } from "@/utils/notification";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      notify.error({ message: "Full name is mandatory" });
      return false;
    }
    if (formData.name.trim().length < 4) {
      notify.error({ message: "Name must be at least 4 characters" });
      return false;
    }

    if (!formData.email.trim()) {
      notify.error({ message: "Email is mandatory" });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      notify.error({ message: "Email is invalid" });
      return false;
    }

    if (!formData.password) {
      notify.error({ message: "Password is mandatory" });
      return false;
    }
    if (formData.password.length < 6) {
      notify.error({ message: "Password must be at least 6 characters" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerUser(formData);
      notify.success({ message: "Registration successful!" });
      login(response.user);
      router.push("/property");
    } catch (error: any) {
      notify.error({
        message: error.message || "Failed to Register, please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="relative h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/assets/hero-image-2.jpg"
          alt="Hero background"
          fill
          className="object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Register</h1>
        </div>
      </section>
      {/* form section */}
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`${styles.input} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
                  disabled={isLoading}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${styles.input} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
                  disabled={isLoading}
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${styles.input} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Register"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/auth/login")}
                className="text-blue-600 hover:text-blue-800 font-medium"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

/// logic
