import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const WHATSAPP_TOKEN = process.env.WHATSAPP_CLOUD_API_TOKEN || "";
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID || "";

export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  const conversationId = request.nextUrl.searchParams.get("conversation_id");

  if (conversationId) {
    const { data: messages } = await supabase
      .from("whatsapp_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    return NextResponse.json({ messages: messages || [] });
  }

  const { data: conversations } = await supabase
    .from("whatsapp_conversations")
    .select("*")
    .order("updated_at", { ascending: false });

  return NextResponse.json({ conversations: conversations || [] });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    const { conversation_id, message } = body;

    if (!conversation_id || !message) {
      return NextResponse.json({ error: "conversation_id y message requeridos" }, { status: 400 });
    }

    const { data: conversation } = await supabase
      .from("whatsapp_conversations")
      .select("phone")
      .eq("id", conversation_id)
      .single();

    if (!conversation) {
      return NextResponse.json({ error: "Conversacion no encontrada" }, { status: 404 });
    }

    await supabase.from("whatsapp_messages").insert({
      conversation_id,
      direction: "outbound",
      message,
    });

    await supabase
      .from("whatsapp_conversations")
      .update({ last_message: message, updated_at: new Date().toISOString() })
      .eq("id", conversation_id);

    if (WHATSAPP_TOKEN && WHATSAPP_PHONE_ID) {
      await fetch(`https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: conversation.phone,
          type: "text",
          text: { body: message },
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[WhatsApp] Error:", err);
    return NextResponse.json({ error: "Error al enviar mensaje" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createAdminClient();
    const { id, status } = await request.json();

    if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });

    await supabase.from("whatsapp_conversations").update({ status }).eq("id", id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[WhatsApp] Error:", err);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
