import { Router } from "express";
import { requireAuth, requireRoles } from "../middleware/auth.middleware";

import {

  getRequests,

  createRequest,

} from "../controllers/pitrumoksha.controller";

const router = Router();

router.get("/", requireAuth, requireRoles("FOUNDER", "ADMIN"), getRequests);

router.post("/", createRequest);

export default router;