import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyVendorSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const vendor = verifyVendorSession(request);
  if (!vendor) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const vendorEmail = vendor.email;

  const { currentPassword, newPassword } = await request.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: "La contraseña debe tener al menos 8 caracteres" }, { status: 400 });
  }

  const supabaseAuth = createClient();
  const { error: signInError } = await supabaseAuth.auth.signInWithPassword({
    email: vendorEmail,
    password: currentPassword,
  });

  if (signInError) {
    return NextResponse.json({ error: "La contraseña actual es incorrecta" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: userList, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    return NextResponse.json({ error: listError.message }, { status: 500 });
  }

  const user = (userList.users || []).find(
    (u) => (u.email || "").toLowerCase() === vendorEmail.toLowerCase()
  );

  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
    password: newPassword,
  });

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
