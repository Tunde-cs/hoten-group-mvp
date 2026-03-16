import { companyInfo } from "@/data/site-content";

export function ContactFooter() {
  return (
    <footer id="contact" className="border-t border-white/10 px-6 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-white">HOTEN GROUP</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-stone-300">
            {companyInfo.tagline}
          </p>
        </div>

        <div className="grid gap-4 text-sm text-stone-300 sm:grid-cols-2">
          <div>
            <p className="font-medium text-white">Email</p>
            <a href={`mailto:${companyInfo.email}`} className="mt-2 block hover:text-white">
              {companyInfo.email}
            </a>
          </div>
          <div>
            <p className="font-medium text-white">Phone</p>
            <a href={`tel:${companyInfo.phone}`} className="mt-2 block hover:text-white">
              {companyInfo.phone}
            </a>
          </div>
          <div>
            <p className="font-medium text-white">Location</p>
            <p className="mt-2">{companyInfo.address}</p>
          </div>
          <div>
            <p className="font-medium text-white">Business Focus</p>
            <p className="mt-2">Inspections • Real Estate • Renovations</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-stone-500">
        © {new Date().getFullYear()} Hoten Group LLC. All rights reserved.
      </div>
    </footer>
  );
}