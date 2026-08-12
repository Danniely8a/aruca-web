import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const VENDORS = [
  { email: "jepherson@aruca.com", name: "JEPHERSON PEREZ", password: "Cambiar123!" },
  { email: "gustavo@aruca.com", name: "GUSTAVO ROSALES", password: "Cambiar123!" },
  { email: "franklin@aruca.com", name: "FRANKLIN SEGOVIA", password: "Cambiar123!" },
];

export async function POST() {
  const supabase = createAdminClient();
  const results: { email: string; status: string; message: string }[] = [];

  for (const v of VENDORS) {
    // Buscar si ya existe
    const { data: existing } = await supabase.auth.admin.listUsers();
    const alreadyExists = (existing?.users || []).find(
      (u) => u.email?.toLowerCase() === v.email
    );

    if (alreadyExists) {
      // Actualizar la contraseña
      const { error } = await supabase.auth.admin.updateUserById(alreadyExists.id, {
        password: v.password,
      });

      if (error) {
        results.push({ email: v.email, status: "error", message: error.message });
      } else {
        results.push({ email: v.email, status: "updated", message: "Contraseña actualizada" });
      }
      continue;
    }

    // Crear usuario nuevo
    const { data, error } = await supabase.auth.admin.createUser({
      email: v.email,
      password: v.password,
      email_confirm: true,
      user_metadata: { name: v.name },
    });

    if (error) {
      results.push({ email: v.email, status: "error", message: error.message });
    } else {
      results.push({ email: v.email, status: "created", message: `ID: ${data.user?.id}` });
    }
  }

  return NextResponse.json({ results });
}
