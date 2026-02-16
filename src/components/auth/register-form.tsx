"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { OAuthButtons } from "@/components/auth/oauth-buttons";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Heslo musí mít alespoň 6 znaků.");
      setLoading(false);
      return;
    }

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setError("Dokončete prosím ověření CAPTCHA.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        captchaToken: captchaToken ?? undefined,
      },
    });

    if (error) {
      setError("Registrace se nezdařila. Zkuste to znovu.");
      setLoading(false);
      turnstileRef.current?.reset();
      setCaptchaToken(null);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 shadow-sm text-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Podpisuj<span className="text-primary">.</span>cz
        </Link>
        <h1 className="mt-6 text-xl font-semibold">Ověřte svůj email</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Poslali jsme vám ověřovací odkaz na <strong>{email}</strong>.
          Klikněte na něj pro dokončení registrace.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Podpisuj<span className="text-primary">.</span>cz
        </Link>
        <h1 className="mt-4 text-xl font-semibold">Vytvořte si účet</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Začněte tvořit profesionální podpisy zdarma
        </p>
      </div>

      <div className="mt-8">
        <OAuthButtons />

        <div className="my-6 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">nebo</span>
          <Separator className="flex-1" />
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="vas@email.cz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="password">Heslo</Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimálně 6 znaků"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1.5"
            />
          </div>

          {TURNSTILE_SITE_KEY && (
            <div className="flex justify-center">
              <Turnstile
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
                options={{ theme: "light", language: "cs" }}
              />
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registrace..." : "Zaregistrovat se"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Registrací souhlasíte s{" "}
            <Link href="/terms" className="underline hover:text-foreground">
              podmínkami použití
            </Link>{" "}
            a{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              ochranou soukromí
            </Link>
            .
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Už máte účet?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Přihlaste se
          </Link>
        </p>
      </div>
    </div>
  );
}
