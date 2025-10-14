import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/header.module.css";

const Header = () => {
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
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
