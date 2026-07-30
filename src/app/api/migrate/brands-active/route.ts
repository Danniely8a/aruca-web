import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST() {
  const supabase = createAdminClient();

  // Try adding the column via a dummy update to check if it exists
  const { error: checkError } = await supabase
    .from("brands")
    .select("active")
    .limit(1);

  if (checkError && checkError.message.includes("active")) {
    // Column doesn't exist - we'll handle it client-side by always sending active
    return NextResponse.json({
      status: "column_missing",
      message: "Add 'active' column via Supabase SQL Editor: ALTER TABLE brands ADD COLUMN active BOOLEAN DEFAULT true;",
    });
  }

  // Set all null active to true
  await supabase.from("brands").update({ active: true }).is("active", null);

  return NextResponse.json({ status: "ok" });
}
