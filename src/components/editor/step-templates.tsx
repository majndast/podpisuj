"use client";

import { Lock } from "lucide-react";
import { useEditorStore } from "@/lib/editor-store";
import { templates, type Template } from "@/lib/templates";
import { Badge } from "@/components/ui/badge";
import type { Tier } from "@/lib/supabase/types";

export function StepTemplates({ tier }: { tier: Tier }) {
  const { templateId, setTemplateId } = useEditorStore();

  const canUsePremium = tier === "pro" || tier === "team";

  return (
    <div>
      <h2 className="text-xl font-bold">Vyberte šablonu</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Klikněte na šablonu pro výběr
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {templates.map((t) => {
          const locked = t.category === "premium" && !canUsePremium;
          const selected = templateId === t.id;

          return (
            <button
              key={t.id}
              onClick={() => !locked && setTemplateId(t.id)}
              disabled={locked}
              className={`relative rounded-xl border p-4 text-left transition-all ${
                selected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : locked
                    ? "cursor-not-allowed border-border bg-muted/50 opacity-60"
                    : "border-border bg-white hover:border-primary/50 hover:shadow-sm"
              }`}
            >
              {t.category === "premium" && (
                <Badge
                  variant="secondary"
                  className="absolute right-2 top-2 gap-1 bg-primary/10 text-primary text-xs"
                >
                  <Lock className="h-3 w-3" />
                  Pro
                </Badge>
              )}

              {/* Placeholder thumbnail */}
              <div className="mb-3 flex items-start gap-2">
                <div className="h-8 w-8 rounded-full bg-muted" />
                <div className="space-y-1">
                  <div className="h-2 w-16 rounded bg-foreground/60" />
                  <div className="h-1.5 w-12 rounded bg-primary/40" />
                  <div className="h-1.5 w-14 rounded bg-muted-foreground/30" />
                </div>
              </div>

              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
