"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardHeader />

        <div className="rounded-xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold">
            Founder Dashboard
          </h1>

          <p className="mt-4 text-gray-600">
            Welcome to Connect Hub Co.
          </p>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}