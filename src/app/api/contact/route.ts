import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, phone, message, products } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Nombre y teléfono son obligatorios" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from("form_submissions").insert({
      type: type || "contacto",
      name,
      email: email || "",
      phone,
      message: message || "",
      products: products || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Form submission error:", error);

      // Table might not exist yet, create it
      if (error.message.includes("does not exist")) {
        return NextResponse.json(
          {
            error:
              "Tabla 'form_submissions' no existe. Crea la tabla en Supabase SQL Editor con el script de migración.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Form submission unexpected error:", err);
    return NextResponse.json({ error: "Error inesperado" }, { status: 500 });
  }
}
