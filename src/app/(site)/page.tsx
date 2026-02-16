import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TemplatesPreview } from "@/components/landing/templates-preview";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <TemplatesPreview />
      <Features />
      <Pricing />
      <FAQ />
    </>
  );
}
