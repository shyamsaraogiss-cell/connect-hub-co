import { Router } from "express";
import {
  createUniversalRequest,
  getUniversalRequest,
  listUniversalRequests,
  listEligiblePartners,
  listOwnAssignments,
  listOwnRequests,
  trackUniversalRequest,
  updatePartnerStatus,
  updateUniversalRequest,
} from "../controllers/universalRequest.controller";
import { optionalAuth, requireAuth, requireRoles } from "../middleware/auth.middleware";
import { acceptAgreement, recordQuotationDecision, submitCustomerPaymentDetails } from "../controllers/commercialWorkflow.controller";

const router = Router();

router.post("/public", optionalAuth, createUniversalRequest);
router.post("/track", trackUniversalRequest);
router.post("/:referenceId/quotation-decision", optionalAuth, recordQuotationDecision);
router.post("/:referenceId/agreement-acceptance", optionalAuth, acceptAgreement);
router.post("/:referenceId/payment-details", optionalAuth, submitCustomerPaymentDetails);
router.get("/mine", requireAuth, requireRoles("CUSTOMER"), listOwnRequests);
router.get("/assigned-to-me", requireAuth, requireRoles("RELIGIOUS_PARTNER"), listOwnAssignments);
router.get("/eligible-partners", requireAuth, requireRoles("FOUNDER", "ADMIN"), listEligiblePartners);
router.get("/", requireAuth, requireRoles("FOUNDER", "ADMIN"), listUniversalRequests);
router.get("/:referenceId", requireAuth, getUniversalRequest);
router.patch("/:referenceId", requireAuth, requireRoles("FOUNDER", "ADMIN"), updateUniversalRequest);
router.patch("/:referenceId/partner-status", requireAuth, requireRoles("RELIGIOUS_PARTNER"), updatePartnerStatus);

export default router;
