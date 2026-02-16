"use client";

import { useEditorStore } from "@/lib/editor-store";
import { getTemplate, wrapSignature } from "@/lib/signature-templates";
import type { SignatureData, SignatureStyle } from "@/lib/supabase/types";

export function SignaturePreview() {
  const { data, style, templateId } = useEditorStore();

  if (!templateId) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Vyberte šablonu pro zobrazení náhledu
      </p>
    );
  }

  const template = getTemplate(templateId);
  if (!template) return null;

  const inner = template.render(data, style);
  const html = wrapSignature(inner, style);
  const align = style.alignment === "center" ? "center" : "left";

  return (
    <div style={{ textAlign: align }}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export function generateSignatureHTML(
  data: SignatureData,
  style: SignatureStyle,
  templateId: string,
  includeWatermark: boolean
): string {
  const template = getTemplate(templateId);
  if (!template) return "";

  const inner = template.render(data, style);
  const wrapped = wrapSignature(inner, style);
  const watermark = includeWatermark
    ? `<p style="margin:8px 0 0;font-size:10px;color:#9CA3AF;"><a href="https://podpisuj.cz" style="color:#9CA3AF;text-decoration:none;">Made with Podpisuj.cz</a></p>`
    : "";

  const align = style.alignment === "center" ? "center" : "left";
  return `<div style="text-align:${align};">${wrapped}${watermark}</div>`;
}
