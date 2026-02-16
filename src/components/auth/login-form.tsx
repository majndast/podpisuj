"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { OAuthButtons } from "@/components/auth/oauth-buttons";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Nesprávný email nebo heslo.");
      setLoading(false);
      return;
    }

    router.push(redirect);
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Podpisuj<span className="text-primary">.</span>cz
        </Link>
        <h1 className="mt-4 text-xl font-semibold">Přihlášení</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Přihlaste se a pokračujte ve tvorbě podpisů
        </p>
      </div>

      <div className="mt-8">
        <OAuthButtons />

        <div className="my-6 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">nebo</span>
          <Separator className="flex-1" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Vaše heslo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1.5"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Přihlašování..." : "Přihlásit se"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Nemáte účet?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Zaregistrujte se
          </Link>
        </p>
      </div>
    </div>
  );
}
