import React from "react";
import Button from "@/components/common/Button";
import styles from "@/styles/auth.module.css";
import Image from "next/image";

const Register = () => {
  return (
    <>
      <section className="relative h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/assets/hero-image-2.jpg"
          alt="Hero background"
          fill
          // width={400}
          // height={300}
          className="object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Register</h1>
        </div>
      </section>
      {/* form section */}
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
          <form className="space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className={`${styles.input} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
              />
              <input
                type="email"
                placeholder="Email"
                className={`${styles.input} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
              />
              <input
                type="password"
                placeholder="Password"
                className={`${styles.input} transition-all duration-200 focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
