"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEditorStore } from "@/lib/editor-store";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { StepTemplates } from "./step-templates";
import { StepDetails } from "./step-details";
import { StepStyle } from "./step-style";
import { StepPreview } from "./step-preview";
import { SignaturePreview } from "./signature-preview";
import type { Tier } from "@/lib/supabase/types";

const steps = [
  { num: 1, label: "Šablona" },
  { num: 2, label: "Údaje" },
  { num: 3, label: "Styl" },
  { num: 4, label: "Náhled" },
];

interface EditorWizardProps {
  userId: string;
  tier: Tier;
  signatureId?: string;
}

export function EditorWizard({ userId, tier, signatureId }: EditorWizardProps) {
  const { step, setStep, templateId, signatureName, data, style, logoUrl, photoUrl, reset } =
    useEditorStore();
  const router = useRouter();

  useEffect(() => {
    if (!signatureId) reset();
  }, [signatureId, reset]);

  const canNext =
    (step === 1 && templateId) ||
    (step === 2 && data.full_name && data.email) ||
    step === 3;

  const handleSave = async () => {
    const supabase = createClient();

    const payload = {
      user_id: userId,
      template_id: templateId,
      name: signatureName,
      data,
      style,
      logo_url: logoUrl,
      photo_url: photoUrl,
    };

    if (signatureId) {
      await supabase
        .from("signatures")
        .update(payload)
        .eq("id", signatureId);
    } else {
      await supabase.from("signatures").insert(payload);
    }

    router.push("/dashboard");
  };

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <button
              onClick={() => {
                if (s.num < step) setStep(s.num);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                s.num === step
                  ? "bg-primary text-primary-foreground"
                  : s.num < step
                    ? "bg-primary/20 text-primary cursor-pointer"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {s.num}
            </button>
            <span
              className={`ml-2 hidden text-sm sm:inline ${
                s.num === step ? "font-medium" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div className="mx-3 h-px w-8 bg-border sm:w-12" />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Form */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && <StepTemplates tier={tier} />}
              {step === 2 && <StepDetails />}
              {step === 3 && <StepStyle />}
              {step === 4 && <StepPreview tier={tier} onSave={handleSave} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step < 4 && (
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
              >
                Zpět
              </Button>
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canNext}
              >
                Pokračovat
              </Button>
            </div>
          )}
        </div>

        {/* Right: Live preview */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Náhled podpisu
            </p>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <SignaturePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
