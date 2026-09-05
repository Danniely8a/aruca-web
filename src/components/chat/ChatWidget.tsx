"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const N8N_URL =
  process.env.NEXT_PUBLIC_N8N_CHAT_URL || "/api/chat";

const WELCOME_MESSAGE =
  "Hola, soy el asistente de ARUCA Maquinarias. Puedo ayudarte a encontrar productos de nuestro catálogo. ¿Qué estás buscando?";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem("aruca_chat_session");
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    window.localStorage.setItem("aruca_chat_session", id);
  }
  return id;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch(N8N_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: getSessionId() }),
      });
      const data = await res.json();
      const reply =
        data.reply ||
        data.output ||
        "Lo siento, no pude procesar tu solicitud. Escríbenos por WhatsApp al +58 412 610 9597.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo siento, hubo un error de conexión. Escríbenos por WhatsApp al +58 412 610 9597.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  return (
    <>
      {open && (
        <div className="fixed bottom-40 right-4 z-50 flex h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:right-6">
          <div className="flex items-center justify-between bg-brand px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Asistente ARUCA</p>
              <p className="text-xs text-white/80">Catálogo en línea</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-brand text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-500">
                  <Loader2 size={16} className="animate-spin" />
                  Escribiendo…
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-gray-200 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Busca un producto, marca o modelo…"
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-brand"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Enviar"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-orange text-white transition-colors hover:brightness-110 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir chat"
        className="fixed bottom-24 right-20 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-all hover:scale-110"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
