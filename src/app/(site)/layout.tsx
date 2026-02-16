import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
