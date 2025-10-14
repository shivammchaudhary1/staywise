import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

const BookingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default BookingLayout;
