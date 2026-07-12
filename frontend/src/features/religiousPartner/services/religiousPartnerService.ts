import { ReligiousPartnerRegistrationFormData } from "../validation/religiousPartnerRegistrationSchema";

export async function registerReligiousPartner(
  data: ReligiousPartnerRegistrationFormData
) {
  const response = await fetch("/api/religious-partners", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ?? "Registration failed."
    );
  }

  return result;
}