import { apiRequest } from "./client";

export type Booking = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  property_address: string;
  preferred_date: string;
  preferred_time: string | null;
  service_type: string;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type CreateBookingPayload = {
  full_name: string;
  email: string;
  phone?: string;
  property_address: string;
  preferred_date: string;
  preferred_time?: string;
  service_type?: string;
  message?: string;
};

export async function getBookings(): Promise<Booking[]> {
  return apiRequest<Booking[]>("/bookings/");
}

export async function createBooking(
  payload: CreateBookingPayload
): Promise<Booking> {
  return apiRequest<Booking>("/bookings/", {
    method: "POST",
    body: payload,
  });
}