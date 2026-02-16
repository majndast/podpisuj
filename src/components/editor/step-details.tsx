"use client";

import { useEditorStore } from "@/lib/editor-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function StepDetails() {
  const { data, setData, signatureName, setSignatureName } = useEditorStore();

  return (
    <div>
      <h2 className="text-xl font-bold">Vyplňte údaje</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Pole označená * jsou povinná
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <Label htmlFor="sig-name">Název podpisu</Label>
          <Input
            id="sig-name"
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
            placeholder="Např. Pracovní, Osobní"
            className="mt-1.5"
          />
        </div>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="full_name">Jméno a příjmení *</Label>
            <Input
              id="full_name"
              value={data.full_name}
              onChange={(e) => setData({ full_name: e.target.value })}
              placeholder="Jan Novák"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="position">Pozice</Label>
            <Input
              id="position"
              value={data.position}
              onChange={(e) => setData({ position: e.target.value })}
              placeholder="Marketing Manager"
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="company">Firma</Label>
            <Input
              id="company"
              value={data.company}
              onChange={(e) => setData({ company: e.target.value })}
              placeholder="Firma s.r.o."
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="motto">Motto / slogan</Label>
            <Input
              id="motto"
              value={data.motto}
              onChange={(e) => setData({ motto: e.target.value })}
              placeholder="Inovace je naše DNA"
              className="mt-1.5"
            />
          </div>
        </div>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ email: e.target.value })}
              placeholder="jan@firma.cz"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => setData({ phone: e.target.value })}
              placeholder="+420 123 456 789"
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="website">Webová stránka</Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => setData({ website: e.target.value })}
            placeholder="www.firma.cz"
            className="mt-1.5"
          />
        </div>

        <Separator />

        <p className="text-sm font-medium">Sociální sítě</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/jmeno" },
            { key: "instagram", label: "Instagram", placeholder: "@jmeno" },
            { key: "facebook", label: "Facebook", placeholder: "facebook.com/jmeno" },
            { key: "twitter", label: "X / Twitter", placeholder: "@jmeno" },
            { key: "github", label: "GitHub", placeholder: "github.com/jmeno" },
            { key: "tiktok", label: "TikTok", placeholder: "@jmeno" },
            { key: "youtube", label: "YouTube", placeholder: "youtube.com/@jmeno" },
          ].map((social) => (
            <div key={social.key}>
              <Label htmlFor={social.key}>{social.label}</Label>
              <Input
                id={social.key}
                value={
                  (data.socials as Record<string, string | undefined>)[
                    social.key
                  ] || ""
                }
                onChange={(e) =>
                  setData({
                    socials: { ...data.socials, [social.key]: e.target.value },
                  })
                }
                placeholder={social.placeholder}
                className="mt-1.5"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
