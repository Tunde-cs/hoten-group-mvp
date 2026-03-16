import { SectionHeading } from "./section-heading";

export function SellerLeadSection() {
  return (
    <section id="sell" className="border-t border-white/10 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Sell Your Property"
          title="Simple seller lead intake for homeowners ready to talk"
          description="A clean section for homeowners who want to sell directly and start the conversation quickly."
        />

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <form className="grid gap-5 lg:grid-cols-2" aria-label="Seller lead form">
            <div>
              <label htmlFor="seller-name" className="mb-2 block text-sm font-medium text-stone-200">
                Name
              </label>
              <input
                id="seller-name"
                name="name"
                type="text"
                className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="seller-email" className="mb-2 block text-sm font-medium text-stone-200">
                Email
              </label>
              <input
                id="seller-email"
                name="email"
                type="email"
                className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="seller-phone" className="mb-2 block text-sm font-medium text-stone-200">
                Phone
              </label>
              <input
                id="seller-phone"
                name="phone"
                type="tel"
                className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="seller-price" className="mb-2 block text-sm font-medium text-stone-200">
                Asking Price
              </label>
              <input
                id="seller-price"
                name="askingPrice"
                type="text"
                className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="seller-address" className="mb-2 block text-sm font-medium text-stone-200">
                Property Address
              </label>
              <input
                id="seller-address"
                name="propertyAddress"
                type="text"
                className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="seller-message" className="mb-2 block text-sm font-medium text-stone-200">
                Message
              </label>
              <textarea
                id="seller-message"
                name="message"
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-stone-900 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="lg:col-span-2">
              <button
                type="button"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
              >
                Submit Property Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}