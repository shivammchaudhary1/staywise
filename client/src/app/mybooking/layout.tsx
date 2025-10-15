import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

const MyBookingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MyBookingLayout;
