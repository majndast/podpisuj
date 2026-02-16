import { Metadata } from "next";
import { Pricing } from "@/components/landing/pricing";

export const metadata: Metadata = {
  title: "Ceník",
  description:
    "Jednoduchý ceník Podpisuj.cz. Free verze zdarma, Pro za 375 Kč jednorázově, Team za 875 Kč jednorázově.",
};

export default function PricingPage() {
  return (
    <div className="py-8">
      <Pricing />
    </div>
  );
}
