import { apiRequest } from "./client";

export type DashboardSummary = {
  total_leads: number;
  total_bookings: number;
  total_messages: number;
  pending_tasks: number;
  recent_activity: unknown[];
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  return apiRequest<DashboardSummary>("/dashboard/summary");
}