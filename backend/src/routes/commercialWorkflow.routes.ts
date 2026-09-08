import { Router } from "express";
import { requireAuth, requireRoles } from "../middleware/auth.middleware";
import {
  confirmBooking, confirmExternalPayment, createQuotation, getInternalWorkflow, releaseQuotation, reviseQuotation,
} from "../controllers/commercialWorkflow.controller";

const router = Router();
const management = [requireAuth, requireRoles("FOUNDER", "ADMIN")] as const;

router.get("/:referenceId", ...management, getInternalWorkflow);
router.post("/:referenceId/quotations", ...management, createQuotation);
router.post("/:referenceId/quotations/:quotationId/release", ...management, releaseQuotation);
router.post("/:referenceId/quotations/:quotationId/revise", ...management, reviseQuotation);
router.post("/:referenceId/external-payment/confirm", ...management, confirmExternalPayment);
router.post("/:referenceId/booking/confirm", ...management, confirmBooking);

export default router;
