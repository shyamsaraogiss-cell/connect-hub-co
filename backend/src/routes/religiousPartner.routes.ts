import { Router } from "express";
import { requireAuth, requireRoles } from "../middleware/auth.middleware";

import {
  getReligiousPartner,
  getReligiousPartners,
  createReligiousPartner,
  updateReligiousPartner,
  deactivateReligiousPartner,
  linkReligiousPartnerUser,
} from "../controllers/religiousPartner.controller";

const router = Router();

const requireManagement = [requireAuth, requireRoles("FOUNDER", "ADMIN")] as const;

router.get("/", ...requireManagement, getReligiousPartners);

router.get("/:id", ...requireManagement, getReligiousPartner);

router.post("/", createReligiousPartner);

router.put("/:id", ...requireManagement, updateReligiousPartner);

router.patch("/:id/deactivate", ...requireManagement, deactivateReligiousPartner);

router.patch("/:id/link-user", ...requireManagement, linkReligiousPartnerUser);

export default router;
