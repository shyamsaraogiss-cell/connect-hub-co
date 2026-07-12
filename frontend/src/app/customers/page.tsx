import { CustomerTable } from "@/features/customerManagement/components/CustomerTable";
import { getCustomers } from "@/features/customerManagement/services/customerService";

interface CustomersPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  const { search } = await searchParams;

  const customers = await getCustomers(search);

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Customer Management
        </h1>

        <p className="mt-2 text-gray-600">
          View and manage all registered customers.
        </p>
      </div>

      <form
        action="/customers"
        className="mb-6"
      >
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by name, mobile or email..."
          className="w-full rounded-lg border p-3"
        />
      </form>

      <CustomerTable customers={customers} />
    </main>
  );
}