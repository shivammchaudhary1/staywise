import React from "react";
import Button from "@/components/common/Button";
import styles from "@/styles/auth.module.css";

const Login = () => {
  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form action="" className="flex flex-col gap-5">
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
          <Button type="submit">Login</Button>
        </form>
      </div>
    </>
  );
};

export default Login;
