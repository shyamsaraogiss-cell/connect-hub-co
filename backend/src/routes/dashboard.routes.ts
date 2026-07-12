import { Router } from "express";
import { getDashboardSummary } from "../controllers/dashboard.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get("/summary", getDashboardSummary);

export default router;