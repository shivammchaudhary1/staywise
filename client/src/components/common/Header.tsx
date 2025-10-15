"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/styles/header.module.css";
import { useAuth } from "@/store/authContext";

const Header = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="hover:opacity-90 transition">
            <Image
              src="/assets/staywise-logo.png"
              alt="StayWise Logo"
              width={170}
              height={60}
              priority
            />
          </Link>
          <nav>
            <ul className={styles.navList}>
              <li>
                <Link href="/property" className={styles.navLink}>
                  Properties
                </Link>
              </li>

              {loading ? (
                <li className="animate-pulse">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </li>
              ) : isAuthenticated ? (
                <>
                  <li>
                    <Link href="/mybooking" className={styles.navLink}>
                      My Bookings
                    </Link>
                  </li>
                  {user?.role === "admin" && (
                    <li>
                      <Link href="/admin" className={styles.navLink}>
                        Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <span className="text-gray-600 text-sm">
                      Welcome, {user?.name}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className={`${styles.loginButton} bg-red-600 hover:bg-red-700`}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/auth/register" className={styles.navLink}>
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/login" className={styles.loginButton}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
