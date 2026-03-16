import { availability, inspectionPricing, stripeConfig } from "@/data/site-content";
import { SectionHeading } from "./section-heading";

export function InspectionBookingSection() {
  return (
    <section id="inspection" className="border-t border-white/10 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Home Inspection Booking"
          title="Schedule and pay for your inspection in one professional flow"
          description="This MVP uses a frontend-first booking experience with a Stripe-ready payment step. Secure backend validation and Checkout session creation can be connected later."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <form className="grid gap-5" aria-label="Home inspection booking form">
              <div>
                <label htmlFor="inspection-name" className="mb-2 block text-sm font-medium text-stone-200">
                  Name
                </label>
                <input
                  id="inspection-name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
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
                    className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
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
                  className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="inspection-date" className="mb-2 block text-sm font-medium text-stone-200">
                  Preferred Date
                </label>
                <input
                  id="inspection-date"
                  name="preferredDate"
                  type="date"
                  className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
                />
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
                  type="button"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Book Inspection
                </button>
              </div>

              <p className="text-xs leading-6 text-stone-400">
                Frontend MVP note: the form is currently presentational. In production, connect this form to a secure backend API route for validation, scheduling logic, CRM/email notifications, and Stripe Checkout session creation.
              </p>
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