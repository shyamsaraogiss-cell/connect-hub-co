import { TextInput } from "@/components/forms/TextInput";

import { ReligiousPartnerFormSectionProps } from "../types/ReligiousPartnerFormProps";

export function AddressInformation({
  register,
  errors,
}: ReligiousPartnerFormSectionProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">
        Address Information
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <TextInput
          id="address.street"
          label="Street Address"
          required
          error={errors.address?.street?.message?.toString()}
          {...register("address.street")}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TextInput
            id="address.city"
            label="City"
            required
            error={errors.address?.city?.message?.toString()}
            {...register("address.city")}
          />

          <TextInput
            id="address.state"
            label="State"
            required
            error={errors.address?.state?.message?.toString()}
            {...register("address.state")}
          />

          <TextInput
            id="address.country"
            label="Country"
            required
            error={errors.address?.country?.message?.toString()}
            {...register("address.country")}
          />

          <TextInput
            id="address.postalCode"
            label="Postal Code"
            required
            error={errors.address?.postalCode?.message?.toString()}
            {...register("address.postalCode")}
          />
        </div>
      </div>
    </section>
  );
}