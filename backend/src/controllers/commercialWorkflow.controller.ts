import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import * as commercial from "../services/commercialWorkflow.service";

function param(value: string | string[]): string { return Array.isArray(value) ? value[0] : value; }
function sendError(error: unknown, res: Response) {
  if (error instanceof commercial.CommercialWorkflowError) return res.status(error.status).json({ success: false, message: error.code });
  throw error;
}

export async function getInternalWorkflow(req: AuthenticatedRequest, res: Response) {
  try { return res.json(await commercial.getInternalWorkflow(param(req.params.referenceId))); } catch (error) { return sendError(error, res); }
}
export async function createQuotation(req: AuthenticatedRequest, res: Response) {
  try { return res.status(201).json(await commercial.createQuotation(param(req.params.referenceId), req.body, req.auth!.id)); } catch (error) { return sendError(error, res); }
}
export async function releaseQuotation(req: AuthenticatedRequest, res: Response) {
  try { return res.json(await commercial.releaseQuotation(param(req.params.referenceId), param(req.params.quotationId), req.auth!.id, req.auth!.role)); } catch (error) { return sendError(error, res); }
}
export async function reviseQuotation(req: AuthenticatedRequest, res: Response) {
  try { return res.status(201).json(await commercial.reviseQuotation(param(req.params.referenceId), param(req.params.quotationId), req.body, req.auth!.id)); } catch (error) { return sendError(error, res); }
}
export async function recordQuotationDecision(req: AuthenticatedRequest, res: Response) {
  try { return res.json(await commercial.recordQuotationDecision(param(req.params.referenceId), req.body, req.auth?.role === "CUSTOMER" ? req.auth.id : undefined)); } catch (error) { return sendError(error, res); }
}
export async function acceptAgreement(req: AuthenticatedRequest, res: Response) {
  try { return res.json(await commercial.acceptAgreement(param(req.params.referenceId), req.body, req.auth?.role === "CUSTOMER" ? req.auth.id : undefined)); } catch (error) { return sendError(error, res); }
}
export async function submitCustomerPaymentDetails(req: AuthenticatedRequest, res: Response) {
  try { return res.status(201).json(await commercial.submitCustomerPaymentDetails(param(req.params.referenceId), req.body, req.auth?.role === "CUSTOMER" ? req.auth.id : undefined)); } catch (error) { return sendError(error, res); }
}
export async function confirmExternalPayment(req: AuthenticatedRequest, res: Response) {
  try { return res.json(await commercial.confirmExternalPayment(param(req.params.referenceId), req.body, req.auth!.id)); } catch (error) { return sendError(error, res); }
}
export async function confirmBooking(req: AuthenticatedRequest, res: Response) {
  try { return res.json(await commercial.confirmBooking(param(req.params.referenceId), req.auth!.id, req.auth!.role)); } catch (error) { return sendError(error, res); }
}
