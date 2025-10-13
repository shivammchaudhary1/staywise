import React from "react";
import { ButtonProps } from "@/types/button";

const Button: React.FC<ButtonProps> = ({
  text,
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 bg-[var(--background-color)] text-white rounded hover:bg-[var(--secondary-color)] cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    >
      {text || children}
    </button>
  );
};

export default Button;
