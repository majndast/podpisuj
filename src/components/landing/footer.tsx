import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-lg font-bold tracking-tight">
              Podpisuj<span className="text-primary">.</span>cz
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Profesionální emailové podpisy pro jednotlivce i týmy.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Produkt{" "}
              <a
                href="https://jpvision.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                JP Vision
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Produkt</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#jak-to-funguje"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Jak to funguje
                </a>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Šablony
                </Link>
              </li>
              <li>
                <a
                  href="#cenik"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Ceník
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Podpora</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#faq"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="mailto:podpora@podpisuj.cz"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Právní</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Podmínky použití
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Ochrana soukromí
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Podpisuj.cz – Všechna práva
            vyhrazena.
          </p>
          <p>
            Od{" "}
            <a
              href="https://jpvision.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              JP Vision
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
