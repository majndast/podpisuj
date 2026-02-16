"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Smartphone,
  Palette,
  Users,
  Download,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Bleskově rychlé",
    description: "Podpis vytvoříte za méně než 2 minuty. Žádné složité nastavování.",
  },
  {
    icon: Palette,
    title: "Plně přizpůsobitelné",
    description: "Barvy, fonty, logo, fotka – vše si upravíte podle sebe.",
  },
  {
    icon: Shield,
    title: "Funguje všude",
    description: "Kompatibilní s Gmail, Outlook, Apple Mail a dalšími klienty.",
  },
  {
    icon: Smartphone,
    title: "Responzivní podpisy",
    description: "Podpisy vypadají skvěle na desktopu i na mobilu.",
  },
  {
    icon: Users,
    title: "Pro celý tým",
    description: "Sdílejte firemní styl a spravujte podpisy pro celý tým.",
  },
  {
    icon: Download,
    title: "Kopírování jedním klikem",
    description: "Zkopírujte podpis a vložte do emailového klienta. Hotovo.",
  },
];

export function Features() {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Vše co potřebujete
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Jednoduchý nástroj s profesionálními výsledky
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
