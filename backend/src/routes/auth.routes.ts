import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Authentication API Working",
  });
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", requireAuth, getCurrentUser);

router.post("/logout", requireAuth, logoutUser);

export default router;
