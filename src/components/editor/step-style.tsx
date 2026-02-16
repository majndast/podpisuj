"use client";

import { useEditorStore } from "@/lib/editor-store";
import { EMAIL_FONTS } from "@/lib/templates";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function StepStyle() {
  const { style, setStyle } = useEditorStore();

  return (
    <div>
      <h2 className="text-xl font-bold">Upravte styl</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Přizpůsobte barvy, font a vzhled podpisu
      </p>

      <div className="mt-6 space-y-5">
        {/* Colors */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="primary_color">Hlavní barva</Label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                type="color"
                id="primary_color"
                value={style.primary_color}
                onChange={(e) => setStyle({ primary_color: e.target.value })}
                className="h-10 w-10 cursor-pointer rounded-lg border border-border"
              />
              <Input
                value={style.primary_color}
                onChange={(e) => setStyle({ primary_color: e.target.value })}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="secondary_color">Barva jména</Label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                type="color"
                id="secondary_color"
                value={style.secondary_color}
                onChange={(e) => setStyle({ secondary_color: e.target.value })}
                className="h-10 w-10 cursor-pointer rounded-lg border border-border"
              />
              <Input
                value={style.secondary_color}
                onChange={(e) => setStyle({ secondary_color: e.target.value })}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="text_color">Barva textu</Label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                type="color"
                id="text_color"
                value={style.text_color}
                onChange={(e) => setStyle({ text_color: e.target.value })}
                className="h-10 w-10 cursor-pointer rounded-lg border border-border"
              />
              <Input
                value={style.text_color}
                onChange={(e) => setStyle({ text_color: e.target.value })}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="background_color">Barva pozadí</Label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                type="color"
                id="background_color"
                value={style.background_color}
                onChange={(e) => setStyle({ background_color: e.target.value })}
                className="h-10 w-10 cursor-pointer rounded-lg border border-border"
              />
              <Input
                value={style.background_color}
                onChange={(e) => setStyle({ background_color: e.target.value })}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Font */}
        <div>
          <Label htmlFor="font">Font</Label>
          <select
            id="font"
            value={style.font}
            onChange={(e) => setStyle({ font: e.target.value })}
            className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {EMAIL_FONTS.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>

        {/* Font size */}
        <div>
          <Label>Velikost textu</Label>
          <div className="mt-1.5 flex gap-2">
            {(["sm", "md", "lg"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setStyle({ font_size: size })}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm transition-colors ${
                  style.font_size === size
                    ? "border-primary bg-primary/5 font-medium text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {size === "sm" ? "Malý" : size === "md" ? "Střední" : "Velký"}
              </button>
            ))}
          </div>
        </div>

        {/* Alignment */}
        <div>
          <Label>Zarovnání</Label>
          <div className="mt-1.5 flex gap-2">
            {(["left", "center"] as const).map((align) => (
              <button
                key={align}
                onClick={() => setStyle({ alignment: align })}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm transition-colors ${
                  style.alignment === align
                    ? "border-primary bg-primary/5 font-medium text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {align === "left" ? "Vlevo" : "Na střed"}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Border radius */}
        <div>
          <Label>Zaoblení rohů</Label>
          <div className="mt-1.5 flex gap-2">
            {([
              { value: "none" as const, label: "Ostré" },
              { value: "sm" as const, label: "Mírné" },
              { value: "md" as const, label: "Střední" },
              { value: "lg" as const, label: "Kulaté" },
            ]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStyle({ border_radius: opt.value })}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  style.border_radius === opt.value
                    ? "border-primary bg-primary/5 font-medium text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Shadow */}
        <div>
          <Label>Stín podpisu</Label>
          <div className="mt-1.5 flex gap-2">
            <button
              onClick={() => setStyle({ shadow: true })}
              className={`flex-1 rounded-lg border px-4 py-2 text-sm transition-colors ${
                style.shadow
                  ? "border-primary bg-primary/5 font-medium text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              Se stínem
            </button>
            <button
              onClick={() => setStyle({ shadow: false })}
              className={`flex-1 rounded-lg border px-4 py-2 text-sm transition-colors ${
                !style.shadow
                  ? "border-primary bg-primary/5 font-medium text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              Bez stínu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
