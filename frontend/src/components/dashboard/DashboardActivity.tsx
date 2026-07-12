"use client";

const activities = [
  "New User Registration",
  "New Religious Partner Joined",
  "PitruMoksha Booking",
  "Travel Assistance Request",
];

export default function DashboardActivity() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">
        Recent Activities
      </h2>

      <ul className="space-y-3">

        {activities.map((activity, index) => (
          <li
            key={index}
            className="border-b pb-2 text-gray-700"
          >
            • {activity}
          </li>
        ))}

      </ul>

    </div>
  );
}