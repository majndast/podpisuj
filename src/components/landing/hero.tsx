"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--coral-light)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-coral-light px-4 py-1.5 text-sm font-medium text-coral-dark mb-6">
              Profesionální podpisy za pár minut
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Emailový podpis, který{" "}
            <span className="text-primary">zaujme</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Vyberte šablonu, vyplňte údaje a jedním kliknutím zkopírujte
            profesionální podpis do Gmailu, Outlooku nebo Apple Mail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button size="lg" className="gap-2 text-base" asChild>
              <Link href="/register">
                Vytvořit podpis zdarma
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 text-base"
              asChild
            >
              <a href="#sablony">Prohlédnout šablony</a>
            </Button>
          </motion.div>
        </div>

        {/* Signature Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-16 max-w-lg"
        >
          <div className="rounded-2xl border border-border bg-white p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 shrink-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5" />
              <div className="min-w-0">
                <p className="text-base font-semibold text-foreground">
                  Jan Novák
                </p>
                <p className="text-sm text-primary">Marketing Manager</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Firma s.r.o.
                </p>
                <div className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
                  <p>+420 123 456 789</p>
                  <p>jan@firma.cz</p>
                  <p className="text-primary">www.firma.cz</p>
                </div>
                <p className="mt-3 border-t border-border pt-3 text-xs italic text-muted-foreground">
                  &ldquo;Inovace je naše DNA&rdquo;
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
