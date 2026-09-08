import { Router } from "express";
import {
  getPublicCategories,
  getPublicServices,
  getPublicServiceBySlug,
} from "../controllers/serviceCatalog.controller";

const router = Router();

// Public Service Catalog Endpoints
router.get("/service-categories", getPublicCategories);
router.get("/services", getPublicServices);
router.get("/services/:slug", getPublicServiceBySlug);

export default router;
