import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, phone, company } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });

    if (error) {
      const message =
        error.message.toLowerCase().includes("already") || error.message.toLowerCase().includes("exist")
          ? "User already registered"
          : error.message;
      return NextResponse.json({ error: message }, { status: 400 });
    }

    if (data.user) {
      const profile: Record<string, string> = {
        id: data.user.id,
        email: data.user.email || email,
        name,
      };
      if (phone) profile.phone = phone;
      if (company) profile.company = company;

      const { error: profileError } = await supabase
        .from("users")
        .upsert(profile, { onConflict: "id" });
      if (profileError) {
        console.error("register: profile upsert failed:", profileError.message);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
