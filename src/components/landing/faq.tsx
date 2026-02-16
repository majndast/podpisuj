"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Jak zkopíruji podpis do Gmailu?",
    answer:
      'Klikněte na tlačítko "Kopírovat podpis", otevřete Gmail → Nastavení → Zobrazit všechna nastavení → Podpis → Vložte (Ctrl+V). Podrobný návod se zobrazí po zkopírování.',
  },
  {
    question: "Funguje podpis v Outlooku?",
    answer:
      "Ano, podpisy fungují ve všech hlavních emailových klientech – Gmail, Outlook (desktop i web), Apple Mail, Thunderbird a dalších.",
  },
  {
    question: "Je to opravdu zdarma?",
    answer:
      "Ano, Free verze je zcela zdarma a zahrnuje 10 šablon, vlastní barvy, fonty a upload loga. Pro verze odemyká premium šablony a neomezené podpisy.",
  },
  {
    question: "Co znamená jednorázová platba?",
    answer:
      "Zaplatíte jednou a máte přístup k placeným funkcím navždy. Žádné měsíční nebo roční poplatky.",
  },
  {
    question: "Mohu podpis později upravit?",
    answer:
      "Samozřejmě. Všechny vaše podpisy jsou uložené ve vašem účtu a můžete je kdykoli upravit a znovu zkopírovat.",
  },
  {
    question: "Jak funguje Team verze?",
    answer:
      "Team verze umožňuje vytvořit firemní brand kit (barvy, fonty, logo) a sdílet ho s celým týmem. Můžete pozvat členy přes email a spravovat jejich podpisy centrálně.",
  },
  {
    question: "Mohu smazat svůj účet a data?",
    answer:
      "Ano, v nastavení účtu můžete kdykoli smazat svůj účet a všechna související data. Respektujeme vaše soukromí.",
  },
];

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-base font-medium">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Časté dotazy
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nenašli jste odpověď? Napište nám.
          </p>
        </div>

        <div className="mt-12">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
