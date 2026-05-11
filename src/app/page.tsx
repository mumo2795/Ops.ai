import dynamic from "next/dynamic";
import { Footer } from "@/components/Footer";
import { AmbientBackdrop } from "@/components/layout/AmbientBackdrop";
import { Navbar } from "@/components/Navbar";
import { CTASection } from "@/components/sections/CTASection";
import { DataToWork } from "@/components/sections/DataToWork";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntegrationsHub } from "@/components/sections/IntegrationsHub";
import { PersonalDevelopment } from "@/components/sections/PersonalDevelopment";
import { PersonalTouch } from "@/components/sections/PersonalTouch";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProfessionalFeatures } from "@/components/sections/ProfessionalFeatures";
import { VoiceSecuritySection } from "@/components/sections/VoiceSecuritySection";
import { WhatsAppCommand } from "@/components/sections/WhatsAppCommand";

const DashboardExamplesSection = dynamic(
  () => import("@/components/sections/DashboardExamplesSection").then((mod) => mod.DashboardExamplesSection),
  {
    loading: () => (
      <section id="ai-dashboards" className="section-padding bg-secondary/25 dark:bg-transparent border-y border-border/60 dark:border-transparent">
        <div className="container-main">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-overline mb-4">Role-based intelligence</p>
            <h2 className="text-headline mb-4">
              AI dashboards
              <br />
              <span className="text-muted-foreground">loading operational views...</span>
            </h2>
          </div>
        </div>
      </section>
    ),
  },
);

export default function HomePage() {
  return (
    <div className="relative min-h-svh overflow-x-hidden bg-background text-foreground">
      <AmbientBackdrop />
      <Navbar />
      <main id="main-content" className="relative z-10 min-h-screen bg-transparent">
        <HeroSection />
        <IntegrationsHub />
        <DashboardExamplesSection />
        <WhatsAppCommand />
        <VoiceSecuritySection />
        <DataToWork />
        <ProfessionalFeatures />
        <PersonalTouch />
        <PersonalDevelopment />
        <PricingSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}
