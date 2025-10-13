import React from "react";

const LoginLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">{children}</div>
    </div>
  );
};

export default LoginLayout;
