import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();

  // Check if column exists
  const { data: checkData, error: checkError } = await supabase
    .from("brands")
    .select("id")
    .limit(1);

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 });
  }

  // Try to select the active column
  const { data: testData, error: testError } = await supabase
    .from("brands")
    .select("id, active")
    .limit(1);

  if (testError && testError.message.includes("active")) {
    return NextResponse.json({
      status: "column_missing",
      message: "La columna 'active' no existe. Ve a Supabase SQL Editor y ejecuta:\n\nALTER TABLE brands ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;\nUPDATE brands SET active = true WHERE active IS NULL;",
    });
  }

  // Column exists, set all null to true
  await supabase.from("brands").update({ active: true }).is("active", null);

  const { data: brands } = await supabase.from("brands").select("id, name, active");

  return NextResponse.json({
    status: "ok",
    message: "Columna 'active' activa. Todas las marcas están visibles.",
    brands: brands?.map(b => `${b.name}: ${b.active !== false ? "visible" : "oculta"}`),
  });
}
