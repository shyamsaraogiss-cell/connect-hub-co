import { Router } from "express";

import {

  getRequests,

  createRequest,

} from "../controllers/pitrumoksha.controller";

const router = Router();

router.get("/", getRequests);

router.post("/", createRequest);

export default router;