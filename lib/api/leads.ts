import { apiRequest } from "./client";

export type Lead = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  motivation: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type CreateLeadPayload = {
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  motivation?: string;
};

export async function getLeads(): Promise<Lead[]> {
  return apiRequest<Lead[]>("/leads/");
}

export async function createLead(payload: CreateLeadPayload): Promise<Lead> {
  return apiRequest<Lead>("/leads/", {
    method: "POST",
    body: payload,
  });
}