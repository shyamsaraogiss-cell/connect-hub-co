import { Router } from "express";

import {
  getReligiousPartners,
  createReligiousPartner,
} from "../controllers/religiousPartner.controller";

const router = Router();

router.get("/", getReligiousPartners);

router.post("/", createReligiousPartner);

export default router;