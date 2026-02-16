"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const templates = [
  {
    name: "Minimalist",
    category: "free" as const,
    style: "border-l-4 border-l-primary",
  },
  {
    name: "Corporate",
    category: "free" as const,
    style: "border-l-4 border-l-foreground",
  },
  {
    name: "Creative",
    category: "free" as const,
    style: "border-l-4 border-l-emerald-500",
  },
  {
    name: "Animated Pro",
    category: "premium" as const,
    style: "border-l-4 border-l-violet-500",
  },
];

function SignatureCard({
  name,
  category,
  style,
}: {
  name: string;
  category: "free" | "premium";
  style: string;
}) {
  return (
    <div
      className={`group relative rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:shadow-md ${style}`}
    >
      {category === "premium" && (
        <Badge
          variant="secondary"
          className="absolute right-3 top-3 gap-1 bg-primary/10 text-primary"
        >
          <Lock className="h-3 w-3" />
          Pro
        </Badge>
      )}

      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-muted" />
        <div className="min-w-0">
          <div className="h-3 w-24 rounded bg-foreground/80" />
          <div className="mt-1.5 h-2.5 w-16 rounded bg-primary/60" />
          <div className="mt-1 h-2.5 w-20 rounded bg-muted-foreground/30" />
          <div className="mt-3 space-y-1">
            <div className="h-2 w-28 rounded bg-muted-foreground/20" />
            <div className="h-2 w-24 rounded bg-muted-foreground/20" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-sm font-medium text-muted-foreground">
        {name}
      </p>
    </div>
  );
}

export function TemplatesPreview() {
  return (
    <section id="sablony" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Šablony pro každou příležitost
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            10 šablon zdarma, desítky dalších v Pro verzi
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <SignatureCard {...template} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2" asChild>
            <Link href="/templates">
              Zobrazit všechny šablony
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
