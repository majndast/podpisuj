import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podmínky použití",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold">Podmínky použití</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Poslední aktualizace: 16. února 2026
      </p>

      <div className="prose prose-gray mt-10 max-w-none space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            1. Úvodní ustanovení
          </h2>
          <p>
            Tyto podmínky použití (dále jen &quot;Podmínky&quot;) upravují
            používání webové aplikace Podpisuj.cz (dále jen
            &quot;Služba&quot;), kterou provozuje JP Vision (dále jen
            &quot;Provozovatel&quot;).
          </p>
          <p>
            Používáním Služby souhlasíte s těmito Podmínkami. Pokud s nimi
            nesouhlasíte, Službu prosím nepoužívejte.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            2. Popis služby
          </h2>
          <p>
            Podpisuj.cz je nástroj pro vytváření profesionálních emailových
            podpisů. Služba umožňuje uživatelům vytvářet, upravovat a
            kopírovat HTML podpisy pro použití v emailových klientech.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            3. Registrace a účet
          </h2>
          <p>
            Pro používání Služby je nutná registrace. Uživatel je povinen
            uvést pravdivé údaje a udržovat je aktuální. Uživatel je
            zodpovědný za bezpečnost svého účtu a hesla.
          </p>
          <p>
            Provozovatel si vyhrazuje právo zrušit účet uživatele, který
            porušuje tyto Podmínky.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            4. Tarify a platby
          </h2>
          <p>
            Služba je dostupná v bezplatném a placeném tarifu. Bezplatný tarif
            umožňuje vytvoření jednoho aktivního podpisu se základními
            šablonami. Placené tarify poskytují přístup k prémiovým šablonám
            a dalším funkcím.
          </p>
          <p>
            Platby za placené tarify jsou jednorázové a nevratné, pokud není
            zákonem stanoveno jinak.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            5. Duševní vlastnictví
          </h2>
          <p>
            Šablony podpisů a design Služby jsou duševním vlastnictvím
            Provozovatele. Uživatel získává licenci k použití vytvořených
            podpisů pro osobní a komerční účely v rámci emailové komunikace.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            6. Omezení odpovědnosti
          </h2>
          <p>
            Služba je poskytována &quot;tak, jak je&quot;. Provozovatel
            nezaručuje nepřetržitý provoz Služby a neodpovídá za škody
            vzniklé jejím používáním. Zobrazení podpisu se může lišit v
            závislosti na emailovém klientu příjemce.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            7. Smazání účtu
          </h2>
          <p>
            Uživatel může kdykoli smazat svůj účet v nastavení. Smazáním
            účtu budou nevratně odstraněna všechna data včetně uložených
            podpisů.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            8. Změny podmínek
          </h2>
          <p>
            Provozovatel si vyhrazuje právo tyto Podmínky kdykoli změnit.
            O změnách bude uživatel informován prostřednictvím emailu nebo
            upozornění ve Službě.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            9. Kontakt
          </h2>
          <p>
            V případě dotazů nás kontaktujte na{" "}
            <a
              href="mailto:podpora@podpisuj.cz"
              className="text-primary hover:underline"
            >
              podpora@podpisuj.cz
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
