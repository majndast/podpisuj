"use client";

import { motion } from "framer-motion";
import { LayoutTemplate, FileText, Palette, Copy } from "lucide-react";

const steps = [
  {
    icon: LayoutTemplate,
    title: "Vyberte šablonu",
    description: "Vybírejte z desítek profesionálních šablon pro každou příležitost.",
  },
  {
    icon: FileText,
    title: "Vyplňte údaje",
    description: "Zadejte jméno, pozici, kontakty a sociální sítě.",
  },
  {
    icon: Palette,
    title: "Upravte styl",
    description: "Změňte barvy, fonty a přidejte logo vaší firmy.",
  },
  {
    icon: Copy,
    title: "Zkopírujte",
    description: "Jedním kliknutím zkopírujte podpis do vašeho emailového klienta.",
  },
];

export function HowItWorks() {
  return (
    <section id="jak-to-funguje" className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Jak to funguje
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Profesionální podpis za 4 jednoduché kroky
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-1 text-xs font-bold text-primary">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
