"use client";

export default function DashboardHeader() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  return (
    <div className="mb-8 flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user.fullName || "User"}
        </h1>

        <p className="mt-2 text-gray-600">
          Connect Hub Co. Founder Dashboard
        </p>
      </div>

      <div className="rounded-lg bg-blue-100 px-5 py-3">
        <p className="text-sm text-gray-600">
          Logged in as
        </p>

        <p className="font-semibold">
          {user.role || "Founder"}
        </p>
      </div>

    </div>
  );
}