import { StatsCard } from "./StatsCard";
import { ReligiousPartner } from "../types/religiousPartner";

interface DashboardStatsProps {
  partners: ReligiousPartner[];
}

export function DashboardStats({
  partners,
}: DashboardStatsProps) {
  const total = partners.length;

  const pending = partners.filter(
    (p) => p.status.toLowerCase() === "pending"
  ).length;

  const verified = partners.filter(
    (p) => p.status.toLowerCase() === "verified"
  ).length;

  const rejected = partners.filter(
    (p) => p.status.toLowerCase() === "rejected"
  ).length;

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard title="Total Partners" value={total} />
      <StatsCard title="Pending" value={pending} />
      <StatsCard title="Verified" value={verified} />
      <StatsCard title="Rejected" value={rejected} />
    </div>
  );
}