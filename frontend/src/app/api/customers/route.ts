import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { createCustomer } from "@/features/customerManagement/services/customerService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const customer = await createCustomer({
      id: crypto.randomUUID(),

      fullName: body.fullName,

      mobile: body.mobile,

      whatsapp: body.whatsapp,

      email: body.email,

      city: body.city,

      state: body.state,

      country: body.country,

      purpose: body.purpose,

      serviceType: body.serviceType,

      status: "New",

      assignedTo: body.assignedTo,

      remarks: body.remarks,

      createdAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Customer registered successfully.",
        data: customer,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to register customer.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Customer API is running.",
  });
}