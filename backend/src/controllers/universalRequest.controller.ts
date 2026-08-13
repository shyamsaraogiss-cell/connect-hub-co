import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import * as requests from "../services/universalRequest.service";

const allowedRequestTypes = new Set([
  "INQUIRY", "BOOKING", "SERVICE_REQUEST", "PARTNER_REGISTRATION", "COMPLAINT", "GRIEVANCE", "FOUNDER_SUPPORT", "OTHER",
]);

function routeParam(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}

export async function createUniversalRequest(req: AuthenticatedRequest, res: Response) {
  const input = req.body as requests.CreateUniversalRequestInput;
  if (!allowedRequestTypes.has(input.requestType) || !input.guestName || !input.title || !input.description) {
    return res.status(400).json({ success: false, message: "Required request fields are missing or invalid." });
  }

  const customerId = req.auth?.role === "CUSTOMER" ? req.auth.id : undefined;
  const record = await requests.createUniversalRequest({
    ...input,
    serviceDomain: input.serviceDomain ?? (req.body.relatedService as string | undefined),
  }, customerId);
  return res.status(201).json(record);
}

export async function listUniversalRequests(req: AuthenticatedRequest, res: Response) {
  return res.json(await requests.listUniversalRequests());
}

export async function listOwnRequests(req: AuthenticatedRequest, res: Response) {
  return res.json(await requests.listCustomerRequests(req.auth!.id));
}

export async function listOwnAssignments(req: AuthenticatedRequest, res: Response) {
  return res.json(await requests.listPartnerAssignments(req.auth!.id));
}

export async function listEligiblePartners(req: AuthenticatedRequest, res: Response) {
  return res.json(await requests.listEligiblePartners());
}

export async function getUniversalRequest(req: AuthenticatedRequest, res: Response) {
  const referenceId = routeParam(req.params.referenceId);
  let record;
  if (req.auth!.role === "CUSTOMER") record = await requests.getCustomerRequest(referenceId, req.auth!.id);
  else if (req.auth!.role === "RELIGIOUS_PARTNER") record = await requests.getPartnerRequest(referenceId, req.auth!.id);
  else record = await requests.getRequestForAdmin(referenceId);
  if (!record) return res.status(404).json({ success: false, message: "Request not found." });
  return res.json(record);
}

export async function trackUniversalRequest(req: AuthenticatedRequest, res: Response) {
  const { referenceId, contactVerification } = req.body as { referenceId?: string; contactVerification?: string };
  if (!referenceId || !contactVerification) {
    return res.status(400).json({ success: false, message: "Reference and contact verification are required." });
  }
  const record = await requests.trackGuestRequest(referenceId.toUpperCase(), contactVerification);
  if (!record) return res.status(404).json({ success: false, message: "Request not found or verification failed." });
  return res.json(record);
}

export async function updateUniversalRequest(req: AuthenticatedRequest, res: Response) {
  try {
    return res.json(await requests.updateRequestByAdmin(routeParam(req.params.referenceId), req.body, req.auth));
  } catch (error) {
    if (error instanceof Error && error.message === "ASSIGNED_PARTNER_NOT_ELIGIBLE") {
      return res.status(400).json({ success: false, message: "Assigned user is not an active Religious Partner." });
    }
    if (error instanceof Error && error.message === "INVALID_STATUS_TRANSITION") {
      return res.status(409).json({ success: false, message: "Status transition is not permitted." });
    }
    if (error instanceof Error && error.message === "REQUEST_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Request not found." });
    }
    throw error;
  }
}

export async function updatePartnerStatus(req: AuthenticatedRequest, res: Response) {
  const { status, publicNote } = req.body as { status?: string; publicNote?: string };
  if (status !== "IN_PROGRESS" && status !== "COMPLETED") {
    return res.status(400).json({ success: false, message: "Partner status is not permitted." });
  }
  const result = await requests.updateRequestByPartner(routeParam(req.params.referenceId), req.auth!.id, status, publicNote);
  if (!result.count) return res.status(404).json({ success: false, message: "Assigned request not found." });
  return res.status(204).send();
}
