import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Podpisuj.cz – Profesionální emailové podpisy",
    template: "%s | Podpisuj.cz",
  },
  description:
    "Vytvořte si profesionální emailový podpis během pár minut. Vyberte z desítek šablon, upravte barvy a fonty a jedním kliknutím zkopírujte do Gmailu, Outlooku nebo Apple Mail.",
  keywords: [
    "emailový podpis",
    "generátor emailových podpisů",
    "podpis do emailu",
    "profesionální emailový podpis",
    "emailový podpis zdarma",
    "podpis pro Gmail",
    "podpis pro Outlook",
  ],
  authors: [{ name: "JP Vision" }],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Podpisuj.cz",
    title: "Podpisuj.cz – Profesionální emailové podpisy",
    description:
      "Vytvořte si profesionální emailový podpis během pár minut. Desítky šablon, snadné kopírování, zdarma.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${inter.variable} font-sans antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
