import { Metadata } from "next";
import Link from "next/link";
import { signatureTemplates } from "@/lib/signature-templates";
import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Šablony emailových podpisů",
  description:
    "Vyberte z 14 profesionálních šablon emailových podpisů. 10 zdarma, 4 prémiové s pokročilými funkcemi.",
};

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Šablony emailových podpisů
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          14 profesionálních šablon. 10 zdarma, 4 prémiové.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {signatureTemplates.map((t) => (
          <div
            key={t.id}
            className="relative rounded-2xl border border-border bg-white p-6 shadow-sm"
          >
            {t.category === "premium" && (
              <Badge
                variant="secondary"
                className="absolute right-4 top-4 gap-1 bg-primary/10 text-primary"
              >
                <Lock className="h-3 w-3" />
                Pro
              </Badge>
            )}

            <div className="min-h-[48px]">
              {t.preview({
                primary_color: "#F97316",
                secondary_color: "#111827",
                text_color: "#6B7280",
                background_color: "#FFFFFF",
                font: "Arial",
                font_size: "md",
                alignment: "left",
                border_radius: "md",
                shadow: true,
              })}
            </div>

            <h3 className="mt-4 text-base font-semibold">{t.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.description}
            </p>

            <Button
              variant={t.category === "free" ? "default" : "outline"}
              size="sm"
              className="mt-4 w-full"
              asChild
            >
              <Link href={t.category === "free" ? "/register" : "/pricing"}>
                {t.category === "free" ? "Použít zdarma" : "Získat Pro"}
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
