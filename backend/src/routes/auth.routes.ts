import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Authentication API Working",
  });
});

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;