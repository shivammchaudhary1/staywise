import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const PropertyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-[80vh]">{children}</div>
      <Footer />
    </>
  );
};

export default PropertyLayout;
