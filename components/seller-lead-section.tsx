"use client";

import { FormEvent, useState } from "react";
import { createLead } from "@/lib/api/leads";
import { SectionHeading } from "./section-heading";

type SellerLeadFormState = {
  name: string;
  email: string;
  phone: string;
  askingPrice: string;
  propertyAddress: string;
  message: string;
};

const initialState: SellerLeadFormState = {
  name: "",
  email: "",
  phone: "",
  askingPrice: "",
  propertyAddress: "",
  message: "",
};

export function SellerLeadSection() {
  const [form, setForm] = useState<SellerLeadFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function updateField(name: keyof SellerLeadFormState, value: string) {
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
      const motivationParts = [
        form.askingPrice ? `Asking Price: ${form.askingPrice}` : "",
        form.message ? `Message: ${form.message}` : "",
      ].filter(Boolean);

      await createLead({
        full_name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        address: form.propertyAddress || undefined,
        motivation: motivationParts.length
          ? motivationParts.join("\n")
          : undefined,
      });

      setSuccess("Your property details were submitted successfully.");
      setForm(initialState);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting your details."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="sell" className="border-t border-white/10 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Sell Your Property"
          title="Simple seller lead intake for homeowners ready to talk"
          description="A clean section for homeowners who want to sell directly and start the conversation quickly."
        />

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <form
            className="grid gap-5 lg:grid-cols-2"
            aria-label="Seller lead form"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="seller-name"
                className="mb-2 block text-sm font-medium text-stone-200"
              >
                Name
              </label>
              <input
                id="seller-name"
                name="name"
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="seller-email"
                className="mb-2 block text-sm font-medium text-stone-200"
              >
                Email
              </label>
              <input
                id="seller-email"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="seller-phone"
                className="mb-2 block text-sm font-medium text-stone-200"
              >
                Phone
              </label>
              <input
                id="seller-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="seller-price"
                className="mb-2 block text-sm font-medium text-stone-200"
              >
                Asking Price
              </label>
              <input
                id="seller-price"
                name="askingPrice"
                type="text"
                value={form.askingPrice}
                onChange={(e) => updateField("askingPrice", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="seller-address"
                className="mb-2 block text-sm font-medium text-stone-200"
              >
                Property Address
              </label>
              <input
                id="seller-address"
                name="propertyAddress"
                type="text"
                value={form.propertyAddress}
                onChange={(e) =>
                  updateField("propertyAddress", e.target.value)
                }
                className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="seller-message"
                className="mb-2 block text-sm font-medium text-stone-200"
              >
                Message
              </label>
              <textarea
                id="seller-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            {success ? (
              <div className="lg:col-span-2 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {success}
              </div>
            ) : null}

            {error ? (
              <div className="lg:col-span-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            ) : null}

            <div className="lg:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Submit Property Details"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}