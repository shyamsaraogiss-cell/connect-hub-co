"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PitruMokshaPage from "@/components/pitrumoksha/PitruMokshaPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PitruMokshaPage />
      </DashboardLayout>
    </ProtectedRoute>
  );
}