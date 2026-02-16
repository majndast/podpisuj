export const dynamic = "force-dynamic";

import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditSignatureLoader } from "@/components/editor/edit-signature-loader";

export const metadata = {
  title: "Upravit podpis",
};

export default async function EditSignaturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  const { data: signature } = await supabase
    .from("signatures")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!signature) notFound();

  return (
    <EditSignatureLoader
      userId={user.id}
      tier={profile?.tier || "free"}
      signature={signature}
    />
  );
}
