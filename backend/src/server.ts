import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes";
import religiousPartnerRoutes from "./routes/religiousPartner.routes";
import pitruMokshaRoutes from "./routes/pitrumoksha.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import universalRequestRoutes from "./routes/universalRequest.routes";
import { requireAuth, requireRoles } from "./middleware/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Connect Hub Co Backend Running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/customers", requireAuth, requireRoles("FOUNDER", "ADMIN"), customerRoutes);

app.use(
  "/api/religious-partners",
  religiousPartnerRoutes
);

app.use(
  "/api/pitrumoksha",
  pitruMokshaRoutes
);

app.use(
  "/api/dashboard",
  requireAuth,
  requireRoles("FOUNDER", "ADMIN"),
  dashboardRoutes
);
app.use("/api/urms/universal-requests", universalRequestRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Backend running on http://localhost:${PORT}`
  );
});