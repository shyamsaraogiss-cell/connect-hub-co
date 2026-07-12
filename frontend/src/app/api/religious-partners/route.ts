import { NextRequest, NextResponse } from "next/server";
import { createReligiousPartner } from "@/features/religiousPartner/repositories/religiousPartnerRepository";
import { religiousPartnerRegistrationSchema } from "@/features/religiousPartner/validation/religiousPartnerRegistrationSchema";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const validatedData =
  religiousPartnerRegistrationSchema.parse(data);

const partner =
  await createReligiousPartner(validatedData);

    console.log("Religious Partner Registration:", partner);

    return NextResponse.json(
  {
    success: true,
    message: "Religious Partner registered successfully.",
    id: partner.id,
  },
  { status: 201 }
);
  } catch (error) {
    console.error("Registration API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process registration.",
      },
      { status: 500 }
    );
  }
}