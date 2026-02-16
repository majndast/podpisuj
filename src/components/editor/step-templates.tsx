"use client";

import { Lock } from "lucide-react";
import { useEditorStore } from "@/lib/editor-store";
import { signatureTemplates } from "@/lib/signature-templates";
import { Badge } from "@/components/ui/badge";
import type { Tier } from "@/lib/supabase/types";

export function StepTemplates({ tier }: { tier: Tier }) {
  const { templateId, setTemplateId, style } = useEditorStore();

  const canUsePremium = tier === "pro" || tier === "team";

  return (
    <div>
      <h2 className="text-xl font-bold">Vyberte šablonu</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Klikněte na šablonu pro výběr
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {signatureTemplates.map((t) => {
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

              <div className="mb-3 min-h-[40px]">
                {t.preview(style)}
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
