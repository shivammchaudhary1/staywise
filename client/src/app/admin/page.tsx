"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/admin.module.css";
import Button from "@/components/common/Button";
import AddProperty from "@/components/admin/AddProperty";
import SeeAllBooking from "@/components/admin/SeeAllBooking";
import { addProperty } from "@/apis/propertyService";
import { PropertyFormData } from "@/types/property";
import { notify } from "@/utils/notification";
import { useAuth } from "@/store/authContext";
import {
  getAdminUpcomingBookings,
  getAdminBookingHistory,
  updateStatus,
} from "@/apis/bookingService";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { getToken } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [allBookingHistory, setAllBookingHistory] = useState([]);
  const [allUpcomingBookings, setAllUpcomingBookings] = useState([]);

  // Toggle state for switching between components
  const [activeView, setActiveView] = useState<"addProperty" | "seeBookings">(
    "addProperty"
  );

  // console.log("All Upcoming Bookings:", allUpcomingBookings);
  // console.log("All Booking History:", allBookingHistory);

  const handleAddProperty = async (propertyData: PropertyFormData) => {
    try {
      setIsLoading(true);
      // Get token from context
      const token = getToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Call API with token
      const response = await addProperty(propertyData, token);
      notify.success({ message: "Property added successfully!" });

      // Reset form (by switching views and back)
      setActiveView("seeBookings");
      setTimeout(() => setActiveView("addProperty"), 0);
    } catch (error: any) {
      notify.error({ message: error.message || "Failed to add property" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetBookings = async () => {
    try {
      setIsLoading(true);
      const token = getToken();
      if (!token) {
        notify.error({ message: "Authentication token not found" });
        router.push("/auth/login");
        return;
      }
      const upcomingBookings = await getAdminUpcomingBookings(token);
      const bookingHistory = await getAdminBookingHistory(token);
      setAllUpcomingBookings(upcomingBookings?.upcomingBookings);
      setAllBookingHistory(bookingHistory?.bookingHistory);
    } catch (error: any) {
      notify.error({ message: error.message || "Failed to fetch bookings" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetBookings();
  }, []);

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      setIsLoading(true);
      const token = getToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }

      await updateStatus(bookingId, status, token);
      notify.success({ message: `Booking ${status} successfully!` });

      // Refresh bookings to show updated status
      await handleGetBookings();
    } catch (error: any) {
      notify.error({
        message: error.message || "Failed to update booking status",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          {activeView === "addProperty" ? (
            <AddProperty onSubmit={handleAddProperty} isLoading={isLoading} />
          ) : (
            <SeeAllBooking
              allUpcomingBookings={allUpcomingBookings}
              allBookingHistory={allBookingHistory}
              isLoading={isLoading}
              onUpdateStatus={handleUpdateStatus}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;

