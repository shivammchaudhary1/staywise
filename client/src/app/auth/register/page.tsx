import React from "react";
import Button from "@/components/common/Button";
import styles from "@/styles/auth.module.css";

const Register = () => {
  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

        <form action="" className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username"
            className={`${styles.input}`}
          />
          <input
            type="email"
            placeholder="Email"
            className={`${styles.input}`}
          />
          <input
            type="password"
            placeholder="Password"
            className={`${styles.input}`}
          />
          <Button type="submit">Register</Button>
        </form>
      </div>
    </>
  );
};

export default Register;
