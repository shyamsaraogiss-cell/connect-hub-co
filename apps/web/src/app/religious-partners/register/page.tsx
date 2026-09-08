import type { Metadata } from "next";
import { ReligiousPartnerApplicationForm } from "@/components/partner/ReligiousPartnerApplicationForm";
import { PublicHeroShell } from "@/features/public-shell";

export const metadata: Metadata = {
  title: "Religious Partner Application | Connect Hub Co.",
  description: "Apply to register as a Religious Partner with Connect Hub Co.",
};

export default function ReligiousPartnerRegistrationPage() {
  return (
    <PublicHeroShell><main className="min-h-[70vh] bg-amber-50 px-6 py-16 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <ReligiousPartnerApplicationForm />
      </div>
    </main></PublicHeroShell>
  );
}
