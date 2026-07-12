"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  religiousPartnerRegistrationSchema,
  ReligiousPartnerRegistrationFormData,
} from "../validation/religiousPartnerRegistrationSchema";

import { registerReligiousPartner } from "../services/religiousPartnerService";

import { PersonalInformation } from "./PersonalInformation";
import { ContactInformation } from "./ContactInformation";
import { ProfessionalInformation } from "./ProfessionalInformation";
import { AddressInformation } from "./AddressInformation";

export function ReligiousPartnerForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReligiousPartnerRegistrationFormData>({
    resolver: zodResolver(religiousPartnerRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "male",
      dateOfBirth: "",

      email: "",
      phone: "",
      alternatePhone: "",

      religion: "",
      denomination: "",
      experienceYears: 0,
      languages: [],
      specialties: [],
      bio: "",

      availableForTravel: false,
      acceptsOnlineCeremonies: false,

      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
    },
  });

  const onSubmit = async (
    data: ReligiousPartnerRegistrationFormData
  ) => {
    try {
      const result = await registerReligiousPartner(data);

      alert("Registration submitted successfully!");

      console.log("API Response:", result);
    } catch (error) {
      console.error(error);

      alert("Failed to submit registration.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10"
    >
      <PersonalInformation
        register={register}
        control={control}
        errors={errors}
      />

      <ContactInformation
        register={register}
        control={control}
        errors={errors}
      />

      <ProfessionalInformation
        register={register}
        control={control}
        errors={errors}
      />

      <AddressInformation
        register={register}
        control={control}
        errors={errors}
      />

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Submitting..."
            : "Register Religious Partner"}
        </button>
      </div>
    </form>
  );
}