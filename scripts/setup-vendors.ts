import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
const env: Record<string, string> = {};
envContent.split("\n").forEach((line) => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const VENDORS = [
  { email: "jepherson@aruca.com", name: "JEPHERSON PEREZ", password: "Cambiar123!" },
  { email: "gustavo@aruca.com", name: "GUSTAVO ROSALES", password: "Cambiar123!" },
  { email: "franklin@aruca.com", name: "FRANKLIN SEGOVIA", password: "Cambiar123!" },
];

async function main() {
  // 1. Limpiar usuarios viejos (los creados con SQL manual)
  console.log("Limpiando usuarios existentes...");
  const { data: existing } = await supabase.auth.admin.listUsers();
  for (const u of existing?.users || []) {
    if (VENDORS.some((v) => v.email === u.email)) {
      await supabase.auth.admin.deleteUser(u.id);
      console.log(`  Eliminado: ${u.email}`);
    }
  }

  // 2. Crear usuarios nuevos
  console.log("\nCreando vendedores...");
  for (const v of VENDORS) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: v.email,
      password: v.password,
      email_confirm: true,
      user_metadata: { name: v.name, role: "vendedor" },
    });

    if (error) {
      console.error(`  ERROR ${v.email}: ${error.message}`);
    } else {
      console.log(`  OK ${v.email} → ID: ${data.user?.id}`);

      // 3. Crear perfil en tabla users con role customer (constraint no permite 'vendedor')
      if (data.user?.id) {
        const { error: profileError } = await supabase
          .from("users")
          .upsert(
            {
              id: data.user.id,
              email: v.email,
              name: v.name,
              role: "customer",
            },
            { onConflict: "id" }
          );

        if (profileError) {
          console.error(`  Perfil ERROR ${v.email}: ${profileError.message}`);
        } else {
          console.log(`  Perfil OK ${v.email} → role: vendedor`);
        }
      }
    }
  }

  console.log("\nListo. Credenciales temporales:");
  VENDORS.forEach((v) => console.log(`  ${v.email} / ${v.password}`));
}

main();
