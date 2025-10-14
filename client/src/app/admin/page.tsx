"use client";
import React, { useState } from "react";
import styles from "@/styles/admin.module.css";
import Button from "@/components/common/Button";
import AddProperty from "@/components/admin/AddProperty";
import SeeAllBooking from "@/components/admin/SeeAllBooking";

const AdminPage = () => {
  // Toggle state for switching between components
  const [activeView, setActiveView] = useState<"addProperty" | "seeBookings">(
    "addProperty"
  );

  return (
    <>
      <div className={styles.adminContainer}>
        <h1 className={styles.adminTitle}>Admin Dashboard</h1>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <Button
              text="Add Property"
              onClick={() => setActiveView("addProperty")}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeView === "addProperty"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
            />
            <Button
              text="See Bookings"
              onClick={() => setActiveView("seeBookings")}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeView === "seeBookings"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
            />
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="w-full">
          {activeView === "addProperty" ? <AddProperty /> : <SeeAllBooking />}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
