import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana soukromí",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold">Ochrana soukromí</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Poslední aktualizace: 16. února 2026
      </p>

      <div className="prose prose-gray mt-10 max-w-none space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            1. Správce osobních údajů
          </h2>
          <p>
            Správcem osobních údajů je JP Vision (dále jen
            &quot;Správce&quot;), provozovatel služby Podpisuj.cz. Kontaktní
            email:{" "}
            <a
              href="mailto:podpora@podpisuj.cz"
              className="text-primary hover:underline"
            >
              podpora@podpisuj.cz
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            2. Jaké údaje zpracováváme
          </h2>
          <p>Při používání Služby zpracováváme následující údaje:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <strong>Registrační údaje:</strong> emailová adresa, heslo
              (šifrované)
            </li>
            <li>
              <strong>Údaje v podpisech:</strong> jméno, pozice, firma,
              kontaktní údaje, které uživatel dobrovolně zadá
            </li>
            <li>
              <strong>Technické údaje:</strong> IP adresa, typ prohlížeče,
              přístupové časy (pro analytiku a bezpečnost)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            3. Účel zpracování
          </h2>
          <p>Vaše údaje zpracováváme za účelem:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Poskytování a vylepšování Služby</li>
            <li>Správy vašeho uživatelského účtu</li>
            <li>Generování emailových podpisů</li>
            <li>
              Analytiky návštěvnosti (Google Analytics 4 – pouze se
              souhlasem)
            </li>
            <li>Komunikace o změnách ve Službě</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            4. Právní základ zpracování
          </h2>
          <p>Osobní údaje zpracováváme na základě:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <strong>Plnění smlouvy</strong> (čl. 6 odst. 1 písm. b GDPR)
              – pro poskytování Služby
            </li>
            <li>
              <strong>Souhlasu</strong> (čl. 6 odst. 1 písm. a GDPR) – pro
              analytické cookies
            </li>
            <li>
              <strong>Oprávněného zájmu</strong> (čl. 6 odst. 1 písm. f
              GDPR) – pro bezpečnost a prevenci zneužití
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            5. Cookies
          </h2>
          <p>
            Používáme nezbytné cookies pro fungování přihlášení a volitelné
            analytické cookies (Google Analytics 4). Analytické cookies se
            aktivují pouze po vašem souhlasu prostřednictvím cookie lišty.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            6. Sdílení údajů
          </h2>
          <p>Vaše údaje sdílíme pouze s:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <strong>Supabase</strong> (databáze a autentizace) – servery v
              EU (Frankfurt)
            </li>
            <li>
              <strong>Vercel</strong> (hosting) – globální CDN
            </li>
            <li>
              <strong>Google Analytics</strong> – pouze se souhlasem
            </li>
          </ul>
          <p>Údaje neprodáváme třetím stranám.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            7. Doba uchování
          </h2>
          <p>
            Vaše údaje uchováváme po dobu existence vašeho účtu. Po smazání
            účtu jsou všechna data nevratně odstraněna do 30 dnů.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            8. Vaše práva
          </h2>
          <p>Podle GDPR máte právo na:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <strong>Přístup</strong> k vašim údajům
            </li>
            <li>
              <strong>Opravu</strong> nepřesných údajů
            </li>
            <li>
              <strong>Výmaz</strong> údajů (smazání účtu v nastavení)
            </li>
            <li>
              <strong>Přenositelnost</strong> údajů
            </li>
            <li>
              <strong>Odvolání souhlasu</strong> s cookies kdykoli
            </li>
            <li>
              <strong>Podání stížnosti</strong> u Úřadu pro ochranu osobních
              údajů (uoou.cz)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            9. Zabezpečení
          </h2>
          <p>
            Přijímáme přiměřená technická a organizační opatření na ochranu
            vašich údajů, včetně šifrování hesel, HTTPS komunikace a
            přístupových politik na úrovni databáze (Row Level Security).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">
            10. Kontakt
          </h2>
          <p>
            Pro uplatnění svých práv nebo jakékoli dotazy ohledně ochrany
            soukromí nás kontaktujte na{" "}
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
