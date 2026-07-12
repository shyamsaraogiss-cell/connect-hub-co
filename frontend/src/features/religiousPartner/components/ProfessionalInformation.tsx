import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { TextInput } from "@/components/forms/TextInput";
import { TextAreaField } from "@/components/forms/TextAreaField";
import {
  MultiSelectField,
  MultiSelectOption,
} from "@/components/forms/MultiSelectField";
import { CheckboxField } from "@/components/forms/CheckboxField";

interface ProfessionalInformationProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const languageOptions: MultiSelectOption[] = [
  { label: "English", value: "english" },
  { label: "Hindi", value: "hindi" },
  { label: "Sanskrit", value: "sanskrit" },
  { label: "Tamil", value: "tamil" },
  { label: "Telugu", value: "telugu" },
  { label: "Kannada", value: "kannada" },
  { label: "Malayalam", value: "malayalam" },
  { label: "Bengali", value: "bengali" },
  { label: "Marathi", value: "marathi" },
  { label: "Gujarati", value: "gujarati" },
];

const specialtyOptions: MultiSelectOption[] = [
  { label: "Wedding Ceremony", value: "wedding" },
  { label: "House Warming", value: "house_warming" },
  { label: "Satyanarayan Puja", value: "satyanarayan_puja" },
  { label: "Griha Pravesh", value: "griha_pravesh" },
  { label: "Pitru Karma", value: "pitru_karma" },
  { label: "Shraddha", value: "shraddha" },
  { label: "Naming Ceremony", value: "naming_ceremony" },
  { label: "Birthday Puja", value: "birthday_puja" },
];

export function ProfessionalInformation<T extends FieldValues>({
  control,
  register,
  errors,
}: ProfessionalInformationProps<T>) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">
        Professional Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextInput
          id="religion"
          label="Religion"
          required
          error={errors.religion?.message as string}
          {...register("religion" as Path<T>)}
        />

        <TextInput
          id="denomination"
          label="Denomination"
          required
          error={errors.denomination?.message as string}
          {...register("denomination" as Path<T>)}
        />

        <TextInput
          id="experienceYears"
          label="Years of Experience"
          type="number"
          required
          error={errors.experienceYears?.message as string}
          {...register("experienceYears" as Path<T>, {
            valueAsNumber: true,
          })}
        />
      </div>

      <MultiSelectField
        id="languages"
        name={"languages" as Path<T>}
        label="Languages Spoken"
        required
        control={control}
        options={languageOptions}
        error={errors.languages?.message as string}
      />

      <MultiSelectField
        id="specialties"
        name={"specialties" as Path<T>}
        label="Ritual Specialties"
        required
        control={control}
        options={specialtyOptions}
        error={errors.specialties?.message as string}
      />

      <TextAreaField
        id="bio"
        label="Biography"
        required
        rows={6}
        placeholder="Describe your experience, expertise and services..."
        error={errors.bio?.message as string}
        {...register("bio" as Path<T>)}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CheckboxField
          id="availableForTravel"
          label="Available for Travel"
          description="Accept bookings outside your city."
          {...register("availableForTravel" as Path<T>)}
        />

        <CheckboxField
          id="acceptsOnlineCeremonies"
          label="Accept Online Ceremonies"
          description="Offer virtual ceremonies via video call."
          {...register("acceptsOnlineCeremonies" as Path<T>)}
        />
      </div>
    </section>
  );
}