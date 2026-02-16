"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const guides = [
  {
    client: "Gmail",
    steps: [
      "Otevřete Gmail a klikněte na ozubené kolečko (Nastavení)",
      "Klikněte na \"Zobrazit všechna nastavení\"",
      "Sjeďte dolů k sekci \"Podpis\"",
      "Klikněte do pole podpisu a vložte (Ctrl+V / Cmd+V)",
      "Klikněte \"Uložit změny\" dole na stránce",
    ],
  },
  {
    client: "Outlook (web)",
    steps: [
      "Otevřete Outlook a klikněte na ozubené kolečko (Nastavení)",
      "Vyberte \"Pošta\" → \"Vytvořit a odpovědět\"",
      "V sekci \"Emailový podpis\" klikněte do editoru",
      "Vložte podpis (Ctrl+V / Cmd+V)",
      "Klikněte \"Uložit\"",
    ],
  },
  {
    client: "Outlook (desktop)",
    steps: [
      "Otevřete Outlook → Soubor → Možnosti → Pošta → Podpisy",
      "Klikněte \"Nový\" a pojmenujte podpis",
      "Klikněte do editoru a vložte (Ctrl+V / Cmd+V)",
      "Klikněte \"OK\"",
    ],
  },
  {
    client: "Apple Mail",
    steps: [
      "Otevřete Mail → Nastavení → Podpisy",
      "Klikněte \"+\" pro nový podpis",
      "Vložte do pravého panelu (Cmd+V)",
      "Zavřete nastavení",
    ],
  },
];

export function CopyGuide() {
  const [selected, setSelected] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-xl border border-border bg-white p-5 shadow-sm"
    >
      <h3 className="text-base font-semibold">
        Jak vložit podpis do emailu?
      </h3>

      <div className="mt-4 flex gap-2">
        {guides.map((guide, i) => (
          <button
            key={guide.client}
            onClick={() => setSelected(i)}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              selected === i
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {guide.client}
          </button>
        ))}
      </div>

      <ol className="mt-4 space-y-2">
        {guides[selected].steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              {i + 1}
            </span>
            <span className="text-muted-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}
