import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { PropertiesSection } from "@/components/properties-section";
import { InspectionBookingSection } from "@/components/inspection-booking-section";
import { SellerLeadSection } from "@/components/seller-lead-section";
import { AboutSection } from "@/components/about-section";
import { ContactFooter } from "@/components/contact-footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <PropertiesSection />
      <InspectionBookingSection />
      <SellerLeadSection />
      <AboutSection />
      <ContactFooter />
    </main>
  );
}