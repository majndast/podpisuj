"use client";

import { useEffect } from "react";
import { useEditorStore } from "@/lib/editor-store";
import { EditorWizard } from "./editor-wizard";
import type { Tier, Signature } from "@/lib/supabase/types";

export function EditSignatureLoader({
  userId,
  tier,
  signature,
}: {
  userId: string;
  tier: Tier;
  signature: Signature;
}) {
  const { loadSignature } = useEditorStore();

  useEffect(() => {
    loadSignature({
      template_id: signature.template_id,
      name: signature.name,
      data: signature.data,
      style: signature.style,
      logo_url: signature.logo_url,
      photo_url: signature.photo_url,
    });
  }, [signature, loadSignature]);

  return (
    <EditorWizard userId={userId} tier={tier} signatureId={signature.id} />
  );
}
