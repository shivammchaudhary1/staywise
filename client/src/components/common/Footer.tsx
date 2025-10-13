import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-[var(--background-color)] text-[var(--text-color-one)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-start mb-4">
          {/* Left side with logo */}
          <div className="flex flex-col items-start">
            <Image
              src="/assets/staywise-logo-white.png"
              alt="StayWise Logo"
              height={80}
              width={200}
              className="mb-2"
            />
          </div>

          {/* Right side links */}
          <div className="flex gap-2 flex-col-reverse">
            <li className="list-none cursor-pointer">
              <Link
                href="/"
                className="list-none cursor-pointer font-bold text-white"
              >
                All Properties
              </Link>
            </li>
            <li className="list-none cursor-pointer">
              <Link
                href="/auth/register"
                className="list-none cursor-pointer font-bold text-white"
              >
                Register
              </Link>
            </li>
            <li className="list-none cursor-pointer font-bold">
              <Link
                href="/auth/login"
                className="list-none cursor-pointer text-white"
              >
                Login
              </Link>
            </li>
          </div>
        </div>

        {/* Copyright text */}
        <div className="text-center pt-4 border-t border-opacity-20 text-sm text-white">
          © 2025 All rights reserved @shivamchaudhary
        </div>
      </div>
    </footer>
  );
};

export default Footer;
