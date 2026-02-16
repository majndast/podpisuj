"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { User } from "@supabase/supabase-js";
import type { Profile, Signature, Tier } from "@/lib/supabase/types";
import { generateSignatureHTML } from "@/components/editor/signature-preview";

interface DashboardContentProps {
  user: User;
  profile: Profile | null;
  signatures: Signature[];
}

export function DashboardContent({
  user,
  profile,
  signatures,
}: DashboardContentProps) {
  const router = useRouter();
  const tier = profile?.tier || "free";
  const maxSignatures = tier === "free" ? 1 : Infinity;
  const canCreate = signatures.length < maxSignatures;

  const handleDelete = async (id: string) => {
    const supabase = createClient();
    await supabase.from("signatures").delete().eq("id", id);
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Moje podpisy</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {signatures.length === 0
              ? "Zatím nemáte žádný podpis. Vytvořte si první!"
              : `${signatures.length} ${signatures.length === 1 ? "podpis" : signatures.length < 5 ? "podpisy" : "podpisů"}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="secondary"
            className="capitalize"
          >
            {tier}
          </Badge>
          {canCreate ? (
            <Button asChild>
              <Link href="/editor">
                <Plus className="mr-2 h-4 w-4" />
                Nový podpis
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/pricing">Upgrade na Pro</Link>
            </Button>
          )}
        </div>
      </div>

      {signatures.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-2xl border border-dashed border-border p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">
            Vytvořte si svůj první podpis
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Vyberte šablonu, vyplňte údaje a za pár minut máte profesionální
            emailový podpis.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/editor">
              <Plus className="mr-2 h-4 w-4" />
              Vytvořit podpis
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {signatures.map((sig) => (
            <SignatureCard
              key={sig.id}
              signature={sig}
              tier={tier}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SignatureCard({
  signature,
  tier,
  onDelete,
}: {
  signature: Signature;
  tier: Tier;
  onDelete: (id: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const data = signature.data;

  const handleCopy = async () => {
    const html = generateSignatureHTML(
      signature.data,
      signature.style,
      signature.template_id,
      tier === "free"
    );

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([html], { type: "text/plain" }),
        }),
      ]);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = html;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{signature.name}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {data.full_name || "Bez jména"} &middot;{" "}
            {data.company || "Bez firmy"}
          </p>
        </div>
        <Badge variant="secondary" className="text-xs">
          {signature.template_id}
        </Badge>
      </div>

      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/editor/${signature.id}`}>
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Upravit
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="mr-1.5 h-3.5 w-3.5" />
          ) : (
            <Copy className="mr-1.5 h-3.5 w-3.5" />
          )}
          {copied ? "Zkopírováno" : "Kopírovat"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(signature.id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
