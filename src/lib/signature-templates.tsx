import type { SignatureData, SignatureStyle } from "@/lib/supabase/types";

export interface TemplateRenderer {
  id: string;
  name: string;
  category: "free" | "premium";
  description: string;
  render: (data: SignatureData, style: SignatureStyle) => string;
  preview: (style: SignatureStyle) => React.ReactNode;
}

// Helper: social links with proper URLs
function socialUrl(key: string, value: string): string {
  if (value.startsWith("http")) return value;
  const map: Record<string, string> = {
    linkedin: `https://linkedin.com/in/${value.replace("@", "")}`,
    instagram: `https://instagram.com/${value.replace("@", "")}`,
    facebook: `https://facebook.com/${value.replace("@", "")}`,
    twitter: `https://x.com/${value.replace("@", "")}`,
    github: `https://github.com/${value.replace("@", "")}`,
    tiktok: `https://tiktok.com/@${value.replace("@", "")}`,
    youtube: `https://youtube.com/@${value.replace("@", "")}`,
  };
  return map[key] || value;
}

function socialsHTML(data: SignatureData, style: SignatureStyle, fontSize: number) {
  return Object.entries(data.socials)
    .filter(([, v]) => v)
    .map(
      ([key, value]) =>
        `<a href="${socialUrl(key, value!)}" style="color:${style.primary_color};text-decoration:none;font-size:${fontSize - 2}px;margin-right:8px;">${key.charAt(0).toUpperCase() + key.slice(1)}</a>`
    )
    .join("");
}

function getFontSize(style: SignatureStyle) {
  return style.font_size === "sm" ? 12 : style.font_size === "lg" ? 16 : 14;
}

function phoneHTML(phone: string, style: SignatureStyle): string {
  const cleanPhone = phone.replace(/[\s\-()]/g, "");
  return `<a href="tel:${cleanPhone}" style="color:inherit;text-decoration:none;">${phone}</a>`;
}

function emailHTML(email: string): string {
  return `<a href="mailto:${email}" style="color:inherit;text-decoration:none;">${email}</a>`;
}

function contactLine(data: SignatureData, style: SignatureStyle, sep = " | "): string {
  const parts: string[] = [];
  if (data.phone) parts.push(phoneHTML(data.phone, style));
  if (data.email) parts.push(emailHTML(data.email));
  return parts.join(sep);
}

function getBorderRadius(br: SignatureStyle["border_radius"]): string {
  switch (br) {
    case "none": return "0";
    case "sm": return "6px";
    case "md": return "12px";
    case "lg": return "20px";
    default: return "12px";
  }
}

export function wrapSignature(innerHtml: string, style: SignatureStyle): string {
  const br = getBorderRadius(style.border_radius);
  const shadow = style.shadow ? "box-shadow:0 2px 8px rgba(0,0,0,0.08),0 1px 3px rgba(0,0,0,0.06);" : "";
  const bg = style.background_color ? `background-color:${style.background_color};` : "";
  const needsWrap = shadow || style.border_radius !== "none" || (style.background_color && style.background_color !== "#FFFFFF" && style.background_color !== "#ffffff");

  if (!needsWrap) return innerHtml;

  return `<div style="display:inline-block;padding:16px 20px;border-radius:${br};${bg}${shadow}">${innerHtml}</div>`;
}

// ─── TEMPLATE 1: Minimalist ─────────────────────────────
const minimalist: TemplateRenderer = {
  id: "minimalist",
  name: "Minimalist",
  category: "free",
  description: "Čistý a jednoduchý",
  preview: (style) => (
    <div className="flex items-center gap-3">
      <div className="h-1 w-8 rounded" style={{ backgroundColor: style.primary_color }} />
      <div className="space-y-1">
        <div className="h-2.5 w-20 rounded bg-foreground/70" />
        <div className="h-2 w-14 rounded" style={{ backgroundColor: `${style.primary_color}80` }} />
      </div>
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;color:${style.text_color};">
<tr><td style="border-left:3px solid ${style.primary_color};padding-left:12px;">
<p style="margin:0;font-weight:700;color:${style.secondary_color};font-size:${fs + 2}px;">${data.full_name}</p>
${data.position ? `<p style="margin:2px 0 0;color:${style.primary_color};">${data.position}${data.company ? ` | ${data.company}` : ""}</p>` : ""}
${data.phone || data.email ? `<p style="margin:6px 0 0;">${contactLine(data, style)}</p>` : ""}
${data.website ? `<p style="margin:2px 0 0;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;">${data.website}</a></p>` : ""}
${socialsHTML(data, style, fs) ? `<div style="margin-top:6px;">${socialsHTML(data, style, fs)}</div>` : ""}
${data.motto ? `<p style="margin:6px 0 0;font-style:italic;font-size:${fs - 2}px;">"${data.motto}"</p>` : ""}
</td></tr></table>`;
  },
};

// ─── TEMPLATE 2: Corporate ──────────────────────────────
const corporate: TemplateRenderer = {
  id: "corporate",
  name: "Corporate",
  category: "free",
  description: "Profesionální firemní styl",
  preview: (style) => (
    <div className="space-y-2">
      <div className="h-2.5 w-24 rounded bg-foreground/70" />
      <div className="h-0.5 w-full" style={{ backgroundColor: style.primary_color }} />
      <div className="space-y-1">
        <div className="h-2 w-16 rounded bg-muted-foreground/30" />
        <div className="h-2 w-20 rounded bg-muted-foreground/30" />
      </div>
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;color:${style.text_color};">
<tr><td>
<p style="margin:0;font-weight:700;color:${style.secondary_color};font-size:${fs + 3}px;text-transform:uppercase;letter-spacing:1px;">${data.full_name}</p>
${data.position ? `<p style="margin:4px 0 0;color:${style.primary_color};font-weight:500;">${data.position}</p>` : ""}
${data.company ? `<p style="margin:2px 0 0;font-weight:500;">${data.company}</p>` : ""}
<div style="margin:10px 0;height:2px;background:${style.primary_color};width:60px;"></div>
${data.phone ? `<p style="margin:0;">${phoneHTML(data.phone, style)}</p>` : ""}
${data.email ? `<p style="margin:2px 0 0;">${emailHTML(data.email)}</p>` : ""}
${data.website ? `<p style="margin:2px 0 0;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;">${data.website}</a></p>` : ""}
${socialsHTML(data, style, fs) ? `<div style="margin-top:8px;">${socialsHTML(data, style, fs)}</div>` : ""}
${data.motto ? `<p style="margin:10px 0 0;font-style:italic;font-size:${fs - 2}px;color:${style.text_color};">"${data.motto}"</p>` : ""}
</td></tr></table>`;
  },
};

// ─── TEMPLATE 3: Creative ───────────────────────────────
const creative: TemplateRenderer = {
  id: "creative",
  name: "Creative",
  category: "free",
  description: "Kreativní a moderní",
  preview: (style) => (
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-xl" style={{ backgroundColor: `${style.primary_color}20`, border: `2px solid ${style.primary_color}` }} />
      <div className="space-y-1">
        <div className="h-2.5 w-20 rounded bg-foreground/70" />
        <div className="h-2 w-12 rounded" style={{ backgroundColor: `${style.primary_color}60` }} />
        <div className="h-2 w-16 rounded bg-muted-foreground/20" />
      </div>
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;color:${style.text_color};">
<tr>
<td style="padding-right:14px;vertical-align:top;">
<div style="width:56px;height:56px;border-radius:12px;background:${style.primary_color}20;border:2px solid ${style.primary_color};"></div>
</td>
<td style="vertical-align:top;">
<p style="margin:0;font-weight:700;color:${style.secondary_color};font-size:${fs + 2}px;">${data.full_name}</p>
${data.position ? `<p style="margin:2px 0 0;color:${style.primary_color};font-weight:600;">${data.position}</p>` : ""}
${data.company ? `<p style="margin:1px 0 0;">${data.company}</p>` : ""}
${data.phone || data.email || data.website ? `<div style="margin-top:8px;padding-top:8px;border-top:1px dashed ${style.primary_color}40;">
${data.phone ? `<p style="margin:0;">${phoneHTML(data.phone, style)}</p>` : ""}
${data.email ? `<p style="margin:2px 0 0;">${emailHTML(data.email)}</p>` : ""}
${data.website ? `<p style="margin:2px 0 0;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;">${data.website}</a></p>` : ""}
</div>` : ""}
${socialsHTML(data, style, fs) ? `<div style="margin-top:6px;">${socialsHTML(data, style, fs)}</div>` : ""}
${data.motto ? `<p style="margin:8px 0 0;padding:6px 10px;background:${style.primary_color}10;border-radius:6px;font-style:italic;font-size:${fs - 2}px;">"${data.motto}"</p>` : ""}
</td></tr></table>`;
  },
};

// ─── TEMPLATE 4: Elegant ────────────────────────────────
const elegant: TemplateRenderer = {
  id: "elegant",
  name: "Elegant",
  category: "free",
  description: "Elegantní s jemnými detaily",
  preview: (style) => (
    <div className="text-center space-y-1">
      <div className="mx-auto h-2.5 w-20 rounded bg-foreground/70" />
      <div className="mx-auto h-0.5 w-12" style={{ backgroundColor: style.primary_color }} />
      <div className="mx-auto h-2 w-14 rounded bg-muted-foreground/30" />
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;color:${style.text_color};text-align:center;">
<tr><td style="padding:0 20px;">
<p style="margin:0;font-weight:700;color:${style.secondary_color};font-size:${fs + 3}px;letter-spacing:2px;">${data.full_name.toUpperCase()}</p>
<div style="margin:6px auto;height:1px;background:${style.primary_color};width:40px;"></div>
${data.position ? `<p style="margin:4px 0 0;color:${style.primary_color};font-size:${fs - 1}px;letter-spacing:1px;">${data.position.toUpperCase()}</p>` : ""}
${data.company ? `<p style="margin:2px 0 0;font-size:${fs - 1}px;">${data.company}</p>` : ""}
<div style="margin:8px 0;height:1px;background:${style.text_color}20;"></div>
<p style="margin:0;font-size:${fs - 1}px;">${contactLine(data, style, "  ·  ")}</p>
${data.website ? `<p style="margin:4px 0 0;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;font-size:${fs - 1}px;">${data.website}</a></p>` : ""}
${socialsHTML(data, style, fs) ? `<div style="margin-top:6px;">${socialsHTML(data, style, fs)}</div>` : ""}
${data.motto ? `<p style="margin:8px 0 0;font-style:italic;font-size:${fs - 2}px;">"${data.motto}"</p>` : ""}
</td></tr></table>`;
  },
};

// ─── TEMPLATE 5: Bold ───────────────────────────────────
const bold: TemplateRenderer = {
  id: "bold",
  name: "Bold",
  category: "free",
  description: "Výrazný a sebevědomý",
  preview: (style) => (
    <div className="space-y-1">
      <div className="h-3 w-28 rounded" style={{ backgroundColor: style.primary_color }} />
      <div className="h-2 w-16 rounded bg-foreground/50" />
      <div className="h-2 w-20 rounded bg-muted-foreground/20" />
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;color:${style.text_color};">
<tr><td>
<p style="margin:0;font-weight:900;color:${style.primary_color};font-size:${fs + 6}px;line-height:1.1;">${data.full_name}</p>
${data.position ? `<p style="margin:4px 0 0;font-weight:600;color:${style.secondary_color};font-size:${fs + 1}px;">${data.position}</p>` : ""}
${data.company ? `<p style="margin:2px 0 0;">${data.company}</p>` : ""}
<div style="margin:10px 0;height:3px;background:${style.primary_color};width:100%;max-width:200px;border-radius:2px;"></div>
${data.phone ? `<p style="margin:0;font-weight:500;">${phoneHTML(data.phone, style)}</p>` : ""}
${data.email ? `<p style="margin:2px 0 0;">${emailHTML(data.email)}</p>` : ""}
${data.website ? `<p style="margin:2px 0 0;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;font-weight:600;">${data.website}</a></p>` : ""}
${socialsHTML(data, style, fs) ? `<div style="margin-top:8px;">${socialsHTML(data, style, fs)}</div>` : ""}
${data.motto ? `<p style="margin:10px 0 0;font-size:${fs - 1}px;font-weight:600;color:${style.primary_color};">${data.motto}</p>` : ""}
</td></tr></table>`;
  },
};

// ─── TEMPLATE 6: Classic ────────────────────────────────
const classic: TemplateRenderer = {
  id: "classic",
  name: "Classic",
  category: "free",
  description: "Nadčasová klasika",
  preview: (style) => (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-muted" />
      <div className="h-0.5 w-px bg-border" style={{ height: 32 }} />
      <div className="space-y-1">
        <div className="h-2.5 w-20 rounded bg-foreground/70" />
        <div className="h-2 w-16 rounded bg-muted-foreground/30" />
      </div>
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;color:${style.text_color};">
<tr>
<td style="padding-right:12px;vertical-align:middle;">
<div style="width:50px;height:50px;border-radius:50%;background:${style.primary_color}15;"></div>
</td>
<td style="border-left:1px solid ${style.text_color}30;padding-left:12px;vertical-align:middle;">
<p style="margin:0;font-weight:600;color:${style.secondary_color};">${data.full_name}</p>
<p style="margin:2px 0 0;color:${style.primary_color};font-size:${fs - 1}px;">${[data.position, data.company].filter(Boolean).join(" · ")}</p>
<p style="margin:4px 0 0;font-size:${fs - 1}px;">${contactLine(data, style)}</p>
${data.website ? `<p style="margin:2px 0 0;font-size:${fs - 1}px;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;">${data.website}</a></p>` : ""}
${socialsHTML(data, style, fs) ? `<div style="margin-top:4px;">${socialsHTML(data, style, fs)}</div>` : ""}
</td></tr></table>`;
  },
};

// ─── TEMPLATE 7: Startup ────────────────────────────────
const startup: TemplateRenderer = {
  id: "startup",
  name: "Startup",
  category: "free",
  description: "Moderní pro startupy",
  preview: (style) => (
    <div className="rounded-lg p-2" style={{ backgroundColor: `${style.primary_color}08`, border: `1px solid ${style.primary_color}20` }}>
      <div className="space-y-1">
        <div className="h-2.5 w-20 rounded bg-foreground/70" />
        <div className="h-2 w-28 rounded bg-muted-foreground/20" />
      </div>
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;color:${style.text_color};">
<tr><td style="padding:12px 16px;background:${style.primary_color}08;border:1px solid ${style.primary_color}20;border-radius:8px;">
<p style="margin:0;font-weight:700;color:${style.secondary_color};font-size:${fs + 1}px;">${data.full_name} ${data.position ? `<span style="font-weight:400;color:${style.text_color};font-size:${fs - 1}px;">/ ${data.position}</span>` : ""}</p>
${data.company ? `<p style="margin:4px 0 0;color:${style.primary_color};font-weight:600;">${data.company}</p>` : ""}
<p style="margin:6px 0 0;font-size:${fs - 1}px;">${[data.email ? emailHTML(data.email) : "", data.phone ? phoneHTML(data.phone, style) : "", data.website ? `<a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;">${data.website}</a>` : ""].filter(Boolean).join(" · ")}</p>
${socialsHTML(data, style, fs) ? `<div style="margin-top:6px;">${socialsHTML(data, style, fs)}</div>` : ""}
${data.motto ? `<p style="margin:8px 0 0;font-size:${fs - 2}px;opacity:0.7;">${data.motto}</p>` : ""}
</td></tr></table>`;
  },
};

// ─── TEMPLATE 8: Consultant ─────────────────────────────
const consultant: TemplateRenderer = {
  id: "consultant",
  name: "Consultant",
  category: "free",
  description: "Profesionální poradce",
  preview: (style) => (
    <div className="space-y-1.5">
      <div className="h-2.5 w-24 rounded bg-foreground/70" />
      <div className="h-2 w-16 rounded" style={{ backgroundColor: `${style.primary_color}60` }} />
      <div className="flex gap-1">
        <div className="h-1.5 w-12 rounded bg-muted-foreground/20" />
        <div className="h-1.5 w-12 rounded bg-muted-foreground/20" />
      </div>
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;color:${style.text_color};">
<tr><td>
<p style="margin:0;font-weight:700;color:${style.secondary_color};font-size:${fs + 2}px;">${data.full_name}</p>
${data.position ? `<p style="margin:3px 0 0;color:${style.primary_color};font-weight:500;">${data.position}</p>` : ""}
${data.company ? `<p style="margin:1px 0 0;font-weight:500;">${data.company}</p>` : ""}
<table cellpadding="0" cellspacing="0" style="margin-top:10px;border-collapse:collapse;font-size:${fs - 1}px;">
${data.phone ? `<tr><td style="padding:2px 8px 2px 0;color:${style.primary_color};font-weight:600;">Tel</td><td style="padding:2px 0;">${phoneHTML(data.phone, style)}</td></tr>` : ""}
${data.email ? `<tr><td style="padding:2px 8px 2px 0;color:${style.primary_color};font-weight:600;">Email</td><td style="padding:2px 0;">${emailHTML(data.email)}</td></tr>` : ""}
${data.website ? `<tr><td style="padding:2px 8px 2px 0;color:${style.primary_color};font-weight:600;">Web</td><td style="padding:2px 0;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;">${data.website}</a></td></tr>` : ""}
</table>
${socialsHTML(data, style, fs) ? `<div style="margin-top:6px;">${socialsHTML(data, style, fs)}</div>` : ""}
${data.motto ? `<p style="margin:8px 0 0;font-style:italic;font-size:${fs - 2}px;border-top:1px solid ${style.text_color}20;padding-top:8px;">"${data.motto}"</p>` : ""}
</td></tr></table>`;
  },
};

// ─── TEMPLATE 9: Developer ──────────────────────────────
const developer: TemplateRenderer = {
  id: "developer",
  name: "Developer",
  category: "free",
  description: "Pro vývojáře a tech",
  preview: (style) => (
    <div className="font-mono space-y-1">
      <div className="flex items-center gap-1">
        <span className="text-[8px]" style={{ color: style.primary_color }}>{">"}</span>
        <div className="h-2 w-20 rounded bg-foreground/70" />
      </div>
      <div className="h-1.5 w-24 rounded bg-muted-foreground/20" />
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:'Courier New',monospace;font-size:${fs}px;color:${style.text_color};">
<tr><td style="padding:10px 14px;background:${style.secondary_color}08;border-left:3px solid ${style.primary_color};border-radius:0 4px 4px 0;">
<p style="margin:0;font-weight:700;color:${style.secondary_color};"><span style="color:${style.primary_color};">$</span> ${data.full_name}</p>
${data.position ? `<p style="margin:2px 0 0;color:${style.primary_color};">// ${data.position}${data.company ? ` @ ${data.company}` : ""}</p>` : ""}
<p style="margin:6px 0 0;font-size:${fs - 1}px;">${contactLine(data, style)}</p>
${data.website ? `<p style="margin:2px 0 0;font-size:${fs - 1}px;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;">${data.website}</a></p>` : ""}
${socialsHTML(data, style, fs) ? `<div style="margin-top:6px;">${socialsHTML(data, style, fs)}</div>` : ""}
</td></tr></table>`;
  },
};

// ─── TEMPLATE 10: Designer ──────────────────────────────
const designer: TemplateRenderer = {
  id: "designer",
  name: "Designer",
  category: "free",
  description: "Pro kreativce a designéry",
  preview: (style) => (
    <div className="flex items-center gap-2">
      <div className="h-10 w-1 rounded-full" style={{ backgroundColor: style.primary_color }} />
      <div className="space-y-1">
        <div className="h-2.5 w-20 rounded bg-foreground/70" />
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: style.primary_color }} />
          <div className="h-2 w-14 rounded bg-muted-foreground/30" />
        </div>
      </div>
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;color:${style.text_color};">
<tr>
<td style="padding-right:12px;vertical-align:top;">
<div style="width:4px;height:60px;border-radius:4px;background:linear-gradient(${style.primary_color}, ${style.primary_color}40);"></div>
</td>
<td style="vertical-align:top;">
<p style="margin:0;font-weight:700;color:${style.secondary_color};font-size:${fs + 1}px;">${data.full_name}</p>
${data.position ? `<p style="margin:3px 0 0;display:flex;align-items:center;gap:6px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${style.primary_color};"></span><span style="color:${style.primary_color};">${data.position}</span></p>` : ""}
${data.company ? `<p style="margin:2px 0 0;padding-left:12px;">${data.company}</p>` : ""}
<p style="margin:8px 0 0;font-size:${fs - 1}px;">${contactLine(data, style, " · ")}</p>
${data.website ? `<p style="margin:2px 0 0;font-size:${fs - 1}px;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;">${data.website}</a></p>` : ""}
${socialsHTML(data, style, fs) ? `<div style="margin-top:6px;">${socialsHTML(data, style, fs)}</div>` : ""}
${data.motto ? `<p style="margin:8px 0 0;font-size:${fs - 2}px;font-style:italic;opacity:0.7;">${data.motto}</p>` : ""}
</td></tr></table>`;
  },
};

// ─── PREMIUM TEMPLATES ──────────────────────────────────
const premiumGradient: TemplateRenderer = {
  id: "premium-gradient",
  name: "Gradient Pro",
  category: "premium",
  description: "Prémiový s gradientem",
  preview: (style) => (
    <div className="rounded-lg p-2" style={{ background: `linear-gradient(135deg, ${style.primary_color}15, ${style.primary_color}05)` }}>
      <div className="space-y-1">
        <div className="h-2.5 w-20 rounded bg-foreground/70" />
        <div className="h-2 w-16 rounded" style={{ backgroundColor: `${style.primary_color}40` }} />
      </div>
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;color:${style.text_color};">
<tr><td style="padding:14px 18px;background:linear-gradient(135deg, ${style.primary_color}12, ${style.primary_color}04);border-radius:10px;">
<p style="margin:0;font-weight:800;color:${style.secondary_color};font-size:${fs + 3}px;">${data.full_name}</p>
${data.position ? `<p style="margin:3px 0 0;color:${style.primary_color};font-weight:600;">${data.position}</p>` : ""}
${data.company ? `<p style="margin:2px 0 0;">${data.company}</p>` : ""}
<div style="margin:10px 0;height:1px;background:linear-gradient(to right, ${style.primary_color}, transparent);"></div>
<p style="margin:0;font-size:${fs - 1}px;">${contactLine(data, style, " · ")}</p>
${data.website ? `<p style="margin:3px 0 0;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;font-weight:600;">${data.website}</a></p>` : ""}
${socialsHTML(data, style, fs) ? `<div style="margin-top:6px;">${socialsHTML(data, style, fs)}</div>` : ""}
${data.motto ? `<p style="margin:10px 0 0;font-size:${fs - 1}px;font-style:italic;">"${data.motto}"</p>` : ""}
</td></tr></table>`;
  },
};

const premiumDark: TemplateRenderer = {
  id: "premium-dark",
  name: "Dark Pro",
  category: "premium",
  description: "Tmavý elegantní styl",
  preview: () => (
    <div className="rounded-lg bg-gray-900 p-2 space-y-1">
      <div className="h-2.5 w-20 rounded bg-white/80" />
      <div className="h-2 w-14 rounded bg-orange-400/60" />
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;">
<tr><td style="padding:16px 20px;background:#1a1a2e;border-radius:10px;color:#e0e0e0;">
<p style="margin:0;font-weight:800;color:#ffffff;font-size:${fs + 3}px;">${data.full_name}</p>
${data.position ? `<p style="margin:3px 0 0;color:${style.primary_color};font-weight:600;">${data.position}</p>` : ""}
${data.company ? `<p style="margin:2px 0 0;color:#a0a0a0;">${data.company}</p>` : ""}
<div style="margin:10px 0;height:1px;background:${style.primary_color}40;"></div>
<p style="margin:0;font-size:${fs - 1}px;color:#b0b0b0;">${contactLine(data, style, " · ")}</p>
${data.website ? `<p style="margin:3px 0 0;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;">${data.website}</a></p>` : ""}
${socialsHTML(data, style, fs) ? `<div style="margin-top:6px;">${socialsHTML(data, style, fs)}</div>` : ""}
${data.motto ? `<p style="margin:10px 0 0;font-size:${fs - 1}px;font-style:italic;color:#888;">"${data.motto}"</p>` : ""}
</td></tr></table>`;
  },
};

const premiumAnimated: TemplateRenderer = {
  id: "premium-animated",
  name: "Animated Pro",
  category: "premium",
  description: "S animovaným GIF prvkem",
  preview: (style) => (
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-lg animate-pulse" style={{ backgroundColor: `${style.primary_color}30` }} />
      <div className="space-y-1">
        <div className="h-2.5 w-20 rounded bg-foreground/70" />
        <div className="h-2 w-16 rounded bg-muted-foreground/30" />
      </div>
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;color:${style.text_color};">
<tr>
<td style="padding-right:14px;vertical-align:top;">
<div style="width:60px;height:60px;border-radius:10px;background:${style.primary_color}20;border:2px solid ${style.primary_color};"></div>
</td>
<td style="vertical-align:top;">
<p style="margin:0;font-weight:700;color:${style.secondary_color};font-size:${fs + 2}px;">${data.full_name}</p>
${data.position ? `<p style="margin:2px 0 0;color:${style.primary_color};font-weight:500;">${data.position}</p>` : ""}
${data.company ? `<p style="margin:1px 0 0;">${data.company}</p>` : ""}
<div style="margin:8px 0;height:2px;background:${style.primary_color};width:40px;border-radius:1px;"></div>
${data.phone ? `<p style="margin:0;font-size:${fs - 1}px;">${phoneHTML(data.phone, style)}</p>` : ""}
${data.email ? `<p style="margin:2px 0 0;font-size:${fs - 1}px;">${emailHTML(data.email)}</p>` : ""}
${data.website ? `<p style="margin:2px 0 0;font-size:${fs - 1}px;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;">${data.website}</a></p>` : ""}
${socialsHTML(data, style, fs) ? `<div style="margin-top:6px;">${socialsHTML(data, style, fs)}</div>` : ""}
${data.motto ? `<p style="margin:8px 0 0;font-style:italic;font-size:${fs - 2}px;">"${data.motto}"</p>` : ""}
</td></tr></table>`;
  },
};

const premiumNeon: TemplateRenderer = {
  id: "premium-neon",
  name: "Neon Pro",
  category: "premium",
  description: "Neonové akcenty",
  preview: (style) => (
    <div className="rounded-lg bg-gray-950 p-2 space-y-1">
      <div className="h-2.5 w-20 rounded" style={{ backgroundColor: style.primary_color }} />
      <div className="h-2 w-16 rounded bg-white/30" />
    </div>
  ),
  render: (data, style) => {
    const fs = getFontSize(style);
    return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fs}px;">
<tr><td style="padding:16px 20px;background:#0a0a0a;border:1px solid ${style.primary_color}40;border-radius:10px;">
<p style="margin:0;font-weight:800;color:${style.primary_color};font-size:${fs + 3}px;">${data.full_name}</p>
${data.position ? `<p style="margin:3px 0 0;color:#ffffff;font-weight:500;">${data.position}</p>` : ""}
${data.company ? `<p style="margin:2px 0 0;color:#888;">${data.company}</p>` : ""}
<div style="margin:10px 0;height:1px;background:${style.primary_color}30;box-shadow:0 0 4px ${style.primary_color}40;"></div>
<p style="margin:0;font-size:${fs - 1}px;color:#aaa;">${contactLine(data, style, " · ")}</p>
${data.website ? `<p style="margin:3px 0 0;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;">${data.website}</a></p>` : ""}
${socialsHTML(data, style, fs) ? `<div style="margin-top:6px;">${socialsHTML(data, style, fs)}</div>` : ""}
${data.motto ? `<p style="margin:10px 0 0;font-size:${fs - 1}px;font-style:italic;color:#666;">"${data.motto}"</p>` : ""}
</td></tr></table>`;
  },
};

// ─── EXPORT ─────────────────────────────────────────────
export const signatureTemplates: TemplateRenderer[] = [
  minimalist,
  corporate,
  creative,
  elegant,
  bold,
  classic,
  startup,
  consultant,
  developer,
  designer,
  premiumGradient,
  premiumDark,
  premiumAnimated,
  premiumNeon,
];

export function getTemplate(id: string): TemplateRenderer | undefined {
  return signatureTemplates.find((t) => t.id === id);
}
