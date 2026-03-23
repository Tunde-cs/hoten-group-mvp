"use client";

import { FormEvent, useState } from "react";
import { availability, inspectionPricing, stripeConfig } from "@/data/site-content";
import { createBooking } from "@/lib/api/bookings";
import { SectionHeading } from "./section-heading";

type BookingFormState = {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

const initialState: BookingFormState = {
  name: "",
  email: "",
  phone: "",
  propertyAddress: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

export function InspectionBookingSection() {
  const [form, setForm] = useState<BookingFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function updateField(name: keyof BookingFormState, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await createBooking({
        full_name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        property_address: form.propertyAddress,
        preferred_date: form.preferredDate,
        preferred_time: form.preferredTime,
        service_type: "inspection",
        message: form.message || undefined,
    });

      setSuccess("Your inspection request was submitted successfully.");
      setForm(initialState);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting your booking."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="inspection" className="border-t border-white/10 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Home Inspection Booking"
          title="Schedule and pay for your inspection in one professional flow"
          description="This MVP uses a frontend-first booking experience with a Stripe-ready payment step."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <form className="grid gap-5" aria-label="Home inspection booking form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="inspection-name" className="mb-2 block text-sm font-medium text-stone-200">
                  Name
                </label>
                <input
                  id="inspection-name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="inspection-email" className="mb-2 block text-sm font-medium text-stone-200">
                    Email
                  </label>
                  <input
                    id="inspection-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="inspection-phone" className="mb-2 block text-sm font-medium text-stone-200">
                    Phone
                  </label>
                  <input
                    id="inspection-phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inspection-address" className="mb-2 block text-sm font-medium text-stone-200">
                  Property Address
                </label>
                <input
                  id="inspection-address"
                  name="propertyAddress"
                  type="text"
                  placeholder="Property address"
                  value={form.propertyAddress}
                  onChange={(e) => updateField("propertyAddress", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="inspection-date" className="mb-2 block text-sm font-medium text-stone-200">
                    Preferred Date
                    </label>
                    <input
                    id="inspection-date"
                    name="preferredDate"
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) => updateField("preferredDate", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
                    required
                    />
                </div>

                <div>
                    <label htmlFor="inspection-time" className="mb-2 block text-sm font-medium text-stone-200">
                    Preferred Time
                    </label>
                    <input
                    id="inspection-time"
                    name="preferredTime"
                    type="time"
                    value={form.preferredTime}
                    onChange={(e) => updateField("preferredTime", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
                    required
                    />
                </div>
                </div>

              <div>
                <label htmlFor="inspection-message" className="mb-2 block text-sm font-medium text-stone-200">
                  Message
                </label>
                <textarea
                  id="inspection-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about the property or inspection needs"
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                <p className="text-sm font-medium text-amber-300">Inspection Price</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {inspectionPricing.amount}
                </p>
                <p className="mt-2 text-sm text-stone-300">{inspectionPricing.note}</p>
              </div>

              {success ? (
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  {success}
                </div>
              ) : null}

              {error ? (
                <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={stripeConfig.paymentLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:translate-y-[-1px] hover:bg-amber-300"
                >
                  Pay for Inspection
                </a>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Submitting..." : "Book Inspection"}
                </button>
              </div>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-white">Business Availability</h3>
              <p className="mt-3 text-sm leading-7 text-stone-300">
                Displayed clearly for scheduling and planning. Update these values easily in <code className="rounded bg-stone-900 px-2 py-1 text-stone-200">data/site-content.ts</code>.
              </p>

              <div className="mt-6 space-y-4">
                {availability.map((item) => (
                  <div key={item.day} className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:border-b-0">
                    <span className="text-sm font-medium text-white">{item.day}</span>
                    <span className="text-sm text-stone-300">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-white">Recommended Booking Flow</h3>
              <ol className="mt-4 space-y-3 text-sm leading-7 text-stone-300">
                <li>1. Client fills inspection request details.</li>
                <li>2. Client reviews service pricing.</li>
                <li>3. Client clicks payment button to continue to Stripe.</li>
                <li>4. Later, backend confirms payment and finalizes booking.</li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}