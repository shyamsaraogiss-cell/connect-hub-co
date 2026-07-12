import { TextInput } from "@/components/forms/TextInput";

import { ReligiousPartnerFormSectionProps } from "../types/ReligiousPartnerFormProps";

export function ContactInformation({
  register,
  errors,
}: ReligiousPartnerFormSectionProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextInput
          id="email"
          label="Email Address"
          type="email"
          required
          placeholder="Enter email"
          error={errors.email?.message?.toString()}
          {...register("email")}
        />

        <TextInput
          id="phone"
          label="Mobile Number"
          type="tel"
          required
          placeholder="Enter mobile number"
          error={errors.phone?.message?.toString()}
          {...register("phone")}
        />

        <TextInput
          id="alternatePhone"
          label="Alternate Mobile Number"
          type="tel"
          placeholder="Optional"
          error={errors.alternatePhone?.message?.toString()}
          {...register("alternatePhone")}
        />
      </div>
    </section>
  );
}