import { Request, Response } from "express";

import * as ReligiousPartnerService from "../services/religiousPartner.service";

const publicFields = new Set([
  "fullName", "category", "mobile", "whatsapp", "email", "city", "state", "country",
  "preferredServiceArea", "onlineAvailable", "offlineAvailable", "relocationAvailable",
]);
const managementFields = new Set([
  ...publicFields,
  "identityVerified", "addressVerified", "qualificationVerified", "verificationDate", "status", "remarks",
]);

function allowlistedBody(body: unknown, allowed: Set<string>) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const entries = Object.entries(body as Record<string, unknown>);
  if (entries.some(([key]) => !allowed.has(key))) return null;
  return Object.fromEntries(entries);
}

function partnerErrorStatus(error: unknown): number | null {
  if (!(error instanceof ReligiousPartnerService.PartnerServiceError)) return null;
  if (error.code === "PARTNER_NOT_FOUND" || error.code === "PARTNER_USER_NOT_FOUND") return 404;
  if (error.code === "ACTIVE_ASSIGNMENTS_EXIST" || error.code === "PARTNER_USER_ALREADY_LINKED" || error.code === "PARTNER_ALREADY_LINKED") return 409;
  if (error.code === "PARTNER_USER_NOT_ELIGIBLE") return 400;
  return null;
}

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
      message: "Failed to fetch Verified Priests.",
    });

  }

}

export async function createReligiousPartner(
  req: Request,
  res: Response
): Promise<void> {

  try {

    const input = allowlistedBody(req.body, publicFields);
    if (!input || typeof input.fullName !== "string" || typeof input.category !== "string" || typeof input.mobile !== "string") {
      res.status(400).json({ success: false, message: "Priest Registration fields are invalid." });
      return;
    }

    const partner =
      await ReligiousPartnerService.createReligiousPartner(input as any);

    res.status(201).json({
      success: true,
      message: "Verified Priest created successfully.",
      data: partner,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create Verified Priest.",
    });

  }

}

export async function getReligiousPartner(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const partner = await ReligiousPartnerService.getReligiousPartner(id);
    if (!partner) { res.status(404).json({ success: false, message: "Verified Priest not found." }); return; }
    res.json({ success: true, data: partner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch Verified Priest." });
  }
}

export async function updateReligiousPartner(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const input = allowlistedBody(req.body, managementFields);
    if (!input || Object.keys(input).length === 0) {
      res.status(400).json({ success: false, message: "Verified Priest update fields are invalid." });
      return;
    }
    if (typeof input.verificationDate === "string") {
      const date = new Date(input.verificationDate);
      if (Number.isNaN(date.getTime())) { res.status(400).json({ success: false, message: "Verification date is invalid." }); return; }
      input.verificationDate = date;
    }
    const partner = await ReligiousPartnerService.updateReligiousPartner(id, input as any);
    res.json({ success: true, data: partner });
  } catch (error) {
    const status = partnerErrorStatus(error);
    if (status) { res.status(status).json({ success: false, message: "Verified Priest update could not be completed." }); return; }
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update Verified Priest." });
  }
}

export async function deactivateReligiousPartner(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const partner = await ReligiousPartnerService.deactivateReligiousPartner(id);
    res.json({ success: true, data: partner });
  } catch (error) {
    if (error instanceof ReligiousPartnerService.PartnerServiceError && error.code === "ACTIVE_ASSIGNMENTS_EXIST") {
      res.status(409).json({ success: false, message: "Resolve or reassign active work before deactivation." });
      return;
    }
    if (error instanceof ReligiousPartnerService.PartnerServiceError && error.code === "PARTNER_NOT_FOUND") {
      res.status(404).json({ success: false, message: "Verified Priest not found." }); return;
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to deactivate Verified Priest." });
  }
}

export async function linkReligiousPartnerUser(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!req.body?.userId) { res.status(400).json({ success: false, message: "Verified Priest user is required." }); return; }
    const partner = await ReligiousPartnerService.linkReligiousPartnerUser(id, req.body.userId);
    res.json({ success: true, data: partner });
  } catch (error) {
    const status = partnerErrorStatus(error);
    if (status) { res.status(status).json({ success: false, message: error instanceof Error ? error.message : "Verified Priest link failed." }); return; }
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to link Verified Priest identity." });
  }
}
