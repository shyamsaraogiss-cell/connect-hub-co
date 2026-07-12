import { TextInput } from "@/components/forms/TextInput";
import { SelectField } from "@/components/forms/SelectField";

import { ReligiousPartnerFormSectionProps } from "../types/ReligiousPartnerFormProps";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export function PersonalInformation({
  register,
  errors,
}: ReligiousPartnerFormSectionProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextInput
          id="firstName"
          label="First Name"
          required
          placeholder="Enter first name"
          error={errors.firstName?.message?.toString()}
          {...register("firstName")}
        />

        <TextInput
          id="lastName"
          label="Last Name"
          required
          placeholder="Enter last name"
          error={errors.lastName?.message?.toString()}
          {...register("lastName")}
        />

        <SelectField
          id="gender"
          label="Gender"
          required
          options={genderOptions}
          error={errors.gender?.message?.toString()}
          {...register("gender")}
        />

        <TextInput
          id="dateOfBirth"
          label="Date of Birth"
          type="date"
          required
          error={errors.dateOfBirth?.message?.toString()}
          {...register("dateOfBirth")}
        />
      </div>
    </section>
  );
}