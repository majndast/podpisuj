"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/lib/supabase/types";

export function SettingsContent({
  user,
  profile,
}: {
  user: User;
  profile: Profile | null;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.push("/");
    } catch {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Nastavení účtu</h1>

      <div className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Profil</h2>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium">{user.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Přihlášení</span>
            <span className="text-sm font-medium capitalize">
              {user.app_metadata?.provider || "email"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tarif</span>
            <Badge variant="secondary" className="capitalize">
              {profile?.tier || "free"}
            </Badge>
          </div>
          {profile?.tier === "free" && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => router.push("/pricing")}
            >
              Upgradovat na Pro
            </Button>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-destructive/20 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-destructive">
          Nebezpečná zóna
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Smazání účtu je nevratné. Všechna data včetně podpisů budou trvale
          odstraněna.
        </p>

        <Separator className="my-4" />

        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting
            ? "Mazání..."
            : confirmDelete
              ? "Opravdu smazat účet"
              : "Smazat účet"}
        </Button>
        {confirmDelete && !deleting && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-2"
            onClick={() => setConfirmDelete(false)}
          >
            Zrušit
          </Button>
        )}
      </div>
    </div>
  );
}
