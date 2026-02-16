import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function DELETE() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Delete user data first
  await supabase.from("signatures").delete().eq("user_id", user.id);
  await supabase.from("profiles").delete().eq("id", user.id);

  // Delete the auth user using service role
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey) {
    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey
    );
    await admin.auth.admin.deleteUser(user.id);
  }

  // Sign out
  await supabase.auth.signOut();

  return NextResponse.json({ ok: true });
}
