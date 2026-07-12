"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CustomerPage from "@/components/customers/CustomerPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <CustomerPage />
      </DashboardLayout>
    </ProtectedRoute>
  );
}