"use client";

type TopbarProps = {
  fullName?: string;
  role?: string;
};

export default function Topbar({
  fullName,
  role,
}: TopbarProps) {
  return (
    <header className="flex items-center justify-between rounded-xl bg-white p-6 shadow">

      <div>
        <h2 className="text-3xl font-bold">
          Welcome, {fullName || "Guest"} 👋
        </h2>

        <p className="mt-1 text-gray-500">
          {role || "Customer"} Dashboard
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-semibold">
            {fullName || "Guest"}
          </p>

          <p className="text-sm text-gray-500">
            {role || "Customer"}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {(fullName || "G").charAt(0).toUpperCase()}
        </div>

      </div>

    </header>
  );
}