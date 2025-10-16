"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/authContext";

const Header = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className="bg-white shadow-md sticky top-0 z-50"
      style={{ backgroundColor: "var(--background-white)" }}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-2 focus:-outline-offset-1"
              style={{ color: "var(--background-color)" }}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className={`size-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className={`size-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
              >
                <path
                  d="M6 18 18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/" className="hover:opacity-90 transition">
                <Image
                  src="/assets/staywise-logo.png"
                  alt="StayWise Logo"
                  width={170}
                  height={60}
                  priority
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/property"
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
                  style={{ color: "var(--background-color)" }}
                >
                  Properties
                </Link>

                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>
                ) : isAuthenticated ? (
                  <>
                    <Link
                      href="/mybooking"
                      className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
                      style={{ color: "var(--background-color)" }}
                    >
                      My Bookings
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        href="/admin"
                        className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
                        style={{ color: "var(--background-color)" }}
                      >
                        Admin Panel
                      </Link>
                    )}
                  </>
                ) : (
                  <Link
                    href="/auth/register"
                    className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
                    style={{ color: "var(--background-color)" }}
                  >
                    Register
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span
                  className="text-sm hidden sm:block"
                  style={{ color: "var(--background-color)" }}
                >
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "var(--background-color)" }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "var(--background-color)" }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div
          className="space-y-1 px-2 pt-2 pb-3"
          style={{ backgroundColor: "var(--background-white)" }}
        >
          <Link
            href="/property"
            className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-gray-100"
            style={{ color: "var(--background-color)" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Properties
          </Link>

          {loading ? (
            <div className="animate-pulse px-3 py-2">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          ) : isAuthenticated ? (
            <>
              <Link
                href="/mybooking"
                className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-gray-100"
                style={{ color: "var(--background-color)" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Bookings
              </Link>
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-gray-100"
                  style={{ color: "var(--background-color)" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <div className="px-3 py-2">
                <span
                  className="text-sm"
                  style={{ color: "var(--background-color)" }}
                >
                  Welcome, {user?.name}
                </span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "var(--background-color)" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/register"
                className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-gray-100"
                style={{ color: "var(--background-color)" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                href="/auth/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "var(--background-color)" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
