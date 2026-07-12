import { CustomerRegistrationForm } from "@/features/customerManagement/components/CustomerRegistrationForm";

export default function NewCustomerPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Customer Registration
      </h1>

      <CustomerRegistrationForm />
    </main>
  );
}