"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "0 Kč",
    description: "Pro jednotlivce, kteří chtějí profesionální podpis.",
    features: [
      "10 šablon",
      "1 aktivní podpis",
      "Vlastní barvy a fonty",
      "Upload loga a fotky",
      "Kopírování jedním klikem",
      "Návod pro emailové klienty",
    ],
    cta: "Začít zdarma",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "375 Kč",
    priceNote: "jednorázově",
    description: "Pro profesionály, kteří chtějí víc.",
    features: [
      "Vše z Free",
      "Všechny šablony vč. premium",
      "Animované GIF šablony",
      "Neomezený počet podpisů",
      "Bez watermarku",
    ],
    cta: "Získat Pro",
    href: "/register?plan=pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: "875 Kč",
    priceNote: "jednorázově",
    description: "Pro firmy a týmy s jednotným stylem.",
    features: [
      "Vše z Pro",
      "Sdílení firemního stylu",
      "Hromadná správa podpisů",
      "Pozvánky členů přes email",
      "Brand kit (barvy, fonty, logo)",
    ],
    cta: "Získat Team",
    href: "/register?plan=team",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="cenik" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Jednoduchý ceník
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Zaplaťte jednou, používejte navždy. Žádné měsíční poplatky.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                tier.highlighted
                  ? "border-primary bg-white shadow-lg shadow-primary/10 ring-1 ring-primary"
                  : "border-border bg-white"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Nejoblíbenější
                </span>
              )}

              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">
                  {tier.price}
                </span>
                {tier.priceNote && (
                  <span className="text-sm text-muted-foreground">
                    {tier.priceNote}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {tier.description}
              </p>

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="mt-8 w-full"
                variant={tier.highlighted ? "default" : "outline"}
                asChild
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
