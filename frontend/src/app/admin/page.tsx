import { getReligiousPartners } from "@/features/religiousPartnerManagement/services/religiousPartnerManagementService";
import { ReligiousPartnerDashboard } from "@/features/religiousPartnerManagement/components/ReligiousPartnerDashboard";

export default async function AdminPage() {
  const partners = await getReligiousPartners();

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Religious Partner Management
        </h1>

        <p className="mt-2 text-gray-600">
          View and manage all registered religious partners.
        </p>
      </div>

      <ReligiousPartnerDashboard partners={partners} />
    </main>
  );
}