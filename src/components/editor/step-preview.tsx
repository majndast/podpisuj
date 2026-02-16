"use client";

import { useState } from "react";
import { Copy, Check, Save, ArrowLeft } from "lucide-react";
import { useEditorStore } from "@/lib/editor-store";
import { Button } from "@/components/ui/button";
import { SignaturePreview, generateSignatureHTML } from "./signature-preview";
import { CopyGuide } from "./copy-guide";
import type { Tier } from "@/lib/supabase/types";

export function StepPreview({
  tier,
  onSave,
}: {
  tier: Tier;
  onSave: () => Promise<void>;
}) {
  const { data, style, setStep } = useEditorStore();
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [saving, setSaving] = useState(false);

  const includeWatermark = tier === "free";

  const handleCopy = async () => {
    const html = generateSignatureHTML(data, style, includeWatermark);

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([html], { type: "text/plain" }),
        }),
      ]);
      setCopied(true);
      setShowGuide(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = html;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setShowGuide(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave();
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Váš podpis je hotový!</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Zkopírujte ho do schránky a vložte do emailového klienta
      </p>

      {/* Mobile preview */}
      <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-sm lg:hidden">
        <SignaturePreview />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button onClick={handleCopy} className="gap-2">
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? "Zkopírováno!" : "Kopírovat podpis"}
        </Button>
        <Button
          variant="outline"
          onClick={handleSave}
          disabled={saving}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {saving ? "Ukládání..." : "Uložit podpis"}
        </Button>
        <Button variant="ghost" onClick={() => setStep(3)} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Zpět na úpravy
        </Button>
      </div>

      {showGuide && <CopyGuide />}
    </div>
  );
}
