import { apiRequest } from "@/lib/api";

export async function getDashboardSummary(
  token?: string
) {
  return apiRequest(
    "/dashboard/summary",
    "GET",
    undefined,
    token
  );
}