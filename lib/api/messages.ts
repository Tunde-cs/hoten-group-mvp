import { apiRequest } from "./client";

export type Message = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export async function getMessages(): Promise<Message[]> {
  return apiRequest<Message[]>("/messages/");
}