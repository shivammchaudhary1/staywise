import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="px-4 py-2 bg-(-varvar(--background-white)) border-2 border-red-500">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/">
            <div>
              <Image
                src="/assets/staywise-logo.png"
                alt="StayWise Logo"
                width={170}
                height={60}
              />
            </div>
          </Link>
          <div className="flex gap-4">
            <Link href="/auth/register">
              <li className="list-none cursor-pointer">Register</li>
            </Link>
            <Link href="/auth/login">
              <li className="list-none cursor-pointer">Login</li>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
