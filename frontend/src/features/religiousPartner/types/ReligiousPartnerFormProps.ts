import {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { ReligiousPartnerRegistrationFormData } from "../validation/religiousPartnerRegistrationSchema";

export interface ReligiousPartnerFormSectionProps {
  register: UseFormRegister<ReligiousPartnerRegistrationFormData>;
  control: Control<ReligiousPartnerRegistrationFormData>;
  errors: FieldErrors<ReligiousPartnerRegistrationFormData>;
}