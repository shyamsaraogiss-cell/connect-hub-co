import { ReligiousPartnerForm } from "@/features/religiousPartner/components/ReligiousPartnerForm";

export default function ReligiousPartnerRegistrationPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Religious Partner Registration
        </h1>

        <p className="mt-2 text-gray-600">
          Complete the form below to register as a verified religious partner on Connect Hub Co.
        </p>
      </div>

      <ReligiousPartnerForm />
    </main>
  );
}