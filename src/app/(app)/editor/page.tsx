export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditorWizard } from "@/components/editor/editor-wizard";

export const metadata = {
  title: "Nový podpis",
};

export default async function EditorPage() {
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

  return <EditorWizard userId={user.id} tier={profile?.tier || "free"} />;
}
