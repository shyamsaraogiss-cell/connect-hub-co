import { Request, Response } from "express";

import * as ReligiousPartnerService from "../services/religiousPartner.service";

export async function getReligiousPartners(
  req: Request,
  res: Response
): Promise<void> {

  try {

    const partners =
      await ReligiousPartnerService.getReligiousPartners();

    res.status(200).json({
      success: true,
      data: partners,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Religious Partners.",
    });

  }

}

export async function createReligiousPartner(
  req: Request,
  res: Response
): Promise<void> {

  try {

    const partner =
      await ReligiousPartnerService.createReligiousPartner(req.body);

    res.status(201).json({
      success: true,
      message: "Religious Partner created successfully.",
      data: partner,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create Religious Partner.",
    });

  }

}