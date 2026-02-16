"use client";

import { useEditorStore } from "@/lib/editor-store";

export function SignaturePreview() {
  const { data, style, templateId } = useEditorStore();

  const fontSize =
    style.font_size === "sm" ? 12 : style.font_size === "lg" ? 16 : 14;

  if (!templateId) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Vyberte šablonu pro zobrazení náhledu
      </p>
    );
  }

  return (
    <div
      style={{
        fontFamily: style.font,
        fontSize: `${fontSize}px`,
        textAlign: style.alignment,
        lineHeight: "1.5",
      }}
    >
      <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ paddingRight: 16, verticalAlign: "top" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: `${style.primary_color}20`,
                  border: `2px solid ${style.primary_color}`,
                }}
              />
            </td>
            <td style={{ verticalAlign: "top" }}>
              {data.full_name && (
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: `${fontSize + 2}px`,
                    color: style.secondary_color,
                  }}
                >
                  {data.full_name}
                </p>
              )}
              {data.position && (
                <p
                  style={{
                    margin: "2px 0 0",
                    color: style.primary_color,
                    fontWeight: 500,
                  }}
                >
                  {data.position}
                </p>
              )}
              {data.company && (
                <p
                  style={{
                    margin: "2px 0 0",
                    color: style.text_color,
                  }}
                >
                  {data.company}
                </p>
              )}

              {(data.phone || data.email || data.website) && (
                <div
                  style={{
                    marginTop: 10,
                    paddingTop: 10,
                    borderTop: `1px solid ${style.primary_color}30`,
                  }}
                >
                  {data.phone && (
                    <p style={{ margin: 0, color: style.text_color }}>
                      {data.phone}
                    </p>
                  )}
                  {data.email && (
                    <p style={{ margin: "2px 0 0", color: style.text_color }}>
                      {data.email}
                    </p>
                  )}
                  {data.website && (
                    <p style={{ margin: "2px 0 0" }}>
                      <a
                        href={
                          data.website.startsWith("http")
                            ? data.website
                            : `https://${data.website}`
                        }
                        style={{ color: style.primary_color, textDecoration: "none" }}
                      >
                        {data.website}
                      </a>
                    </p>
                  )}
                </div>
              )}

              {Object.values(data.socials).some(Boolean) && (
                <div
                  style={{
                    marginTop: 8,
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {Object.entries(data.socials).map(
                    ([key, value]) =>
                      value && (
                        <a
                          key={key}
                          href="#"
                          style={{
                            color: style.primary_color,
                            textDecoration: "none",
                            fontSize: `${fontSize - 2}px`,
                          }}
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </a>
                      )
                  )}
                </div>
              )}

              {data.motto && (
                <p
                  style={{
                    margin: "10px 0 0",
                    paddingTop: 10,
                    borderTop: `1px solid ${style.primary_color}30`,
                    fontStyle: "italic",
                    color: style.text_color,
                    fontSize: `${fontSize - 2}px`,
                  }}
                >
                  &ldquo;{data.motto}&rdquo;
                </p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function generateSignatureHTML(
  data: ReturnType<typeof useEditorStore.getState>["data"],
  style: ReturnType<typeof useEditorStore.getState>["style"],
  includeWatermark: boolean
): string {
  const fontSize =
    style.font_size === "sm" ? 12 : style.font_size === "lg" ? 16 : 14;

  const socialsHTML = Object.entries(data.socials)
    .filter(([, v]) => v)
    .map(
      ([key]) =>
        `<a href="#" style="color:${style.primary_color};text-decoration:none;font-size:${fontSize - 2}px;">${key.charAt(0).toUpperCase() + key.slice(1)}</a>`
    )
    .join(" &nbsp; ");

  const watermark = includeWatermark
    ? `<p style="margin:8px 0 0;font-size:10px;color:#9CA3AF;"><a href="https://podpisuj.cz" style="color:#9CA3AF;text-decoration:none;">Made with Podpisuj.cz</a></p>`
    : "";

  return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${style.font};font-size:${fontSize}px;text-align:${style.alignment};line-height:1.5;">
<tr>
<td style="padding-right:16px;vertical-align:top;">
<div style="width:64px;height:64px;border-radius:50%;background-color:${style.primary_color}20;border:2px solid ${style.primary_color};"></div>
</td>
<td style="vertical-align:top;">
${data.full_name ? `<p style="margin:0;font-weight:700;font-size:${fontSize + 2}px;color:${style.secondary_color};">${data.full_name}</p>` : ""}
${data.position ? `<p style="margin:2px 0 0;color:${style.primary_color};font-weight:500;">${data.position}</p>` : ""}
${data.company ? `<p style="margin:2px 0 0;color:${style.text_color};">${data.company}</p>` : ""}
${
  data.phone || data.email || data.website
    ? `<div style="margin-top:10px;padding-top:10px;border-top:1px solid ${style.primary_color}30;">
${data.phone ? `<p style="margin:0;color:${style.text_color};">${data.phone}</p>` : ""}
${data.email ? `<p style="margin:2px 0 0;color:${style.text_color};">${data.email}</p>` : ""}
${data.website ? `<p style="margin:2px 0 0;"><a href="${data.website.startsWith("http") ? data.website : `https://${data.website}`}" style="color:${style.primary_color};text-decoration:none;">${data.website}</a></p>` : ""}
</div>`
    : ""
}
${socialsHTML ? `<div style="margin-top:8px;">${socialsHTML}</div>` : ""}
${data.motto ? `<p style="margin:10px 0 0;padding-top:10px;border-top:1px solid ${style.primary_color}30;font-style:italic;color:${style.text_color};font-size:${fontSize - 2}px;">&ldquo;${data.motto}&rdquo;</p>` : ""}
${watermark}
</td>
</tr>
</table>`;
}
