"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Send,
  Phone,
  User,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Search,
} from "lucide-react";

interface Conversation {
  id: number;
  phone: string;
  name: string;
  last_message: string;
  unread: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: number;
  conversation_id: number;
  direction: string;
  message: string;
  created_at: string;
}

export default function WhatsAppChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConv) {
      loadMessages(selectedConv.id);
    }
  }, [selectedConv]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversations = async () => {
    try {
      const res = await fetch("/api/whatsapp");
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch {}
    setLoading(false);
  };

  const loadMessages = async (conversationId: number) => {
    try {
      const res = await fetch(`/api/whatsapp?conversation_id=${conversationId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {}
  };

  const sendMessage = async () => {
    if (!replyText.trim() || !selectedConv) return;
    setSending(true);
    try {
      await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id: selectedConv.id,
          message: replyText.trim(),
        }),
      });
      setReplyText("");
      loadMessages(selectedConv.id);
    } catch {}
    setSending(false);
  };

  const closeConversation = async (id: number) => {
    await fetch("/api/whatsapp", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "closed" }),
    });
    loadConversations();
  };

  return (
    <div className="h-[calc(100vh-80px)] -m-6 flex flex-col lg:flex-row bg-white">
      {/* Conversations list */}
      <div className={`w-full lg:w-80 border-r border-gray-200 flex flex-col ${selectedConv ? "hidden lg:flex" : "flex"}`}>
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <MessageCircle size={20} className="text-green-600" />
            WhatsApp
          </h2>
          <p className="text-xs text-gray-400 mt-1">Chat en vivo</p>
        </div>

        {conversations.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm p-8 text-center">
            <div>
              <MessageCircle size={40} className="mx-auto mb-3 text-gray-300" />
              <p>No hay conversaciones</p>
              <p className="text-xs mt-1">Los mensajes de WhatsApp apareceran aqui cuando configures la API</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={`w-full p-4 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                  selectedConv?.id === conv.id ? "bg-brand/5 border-l-2 border-l-brand" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-green-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm text-gray-900 truncate">{conv.name || conv.phone}</p>
                      {conv.status === "open" && <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{conv.last_message || "Sin mensajes"}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chat area */}
      <div className={`flex-1 flex flex-col ${!selectedConv ? "hidden lg:flex" : "flex"}`}>
        {!selectedConv ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MessageCircle size={64} className="mx-auto mb-4 text-gray-200" />
              <p className="text-lg font-medium">Chat en Vivo WhatsApp</p>
              <p className="text-sm mt-1">Selecciona una conversacion para responder</p>
            </div>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <button onClick={() => setSelectedConv(null)} className="lg:hidden p-1">
                <ArrowLeft size={20} />
              </button>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-green-700" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{selectedConv.name || "Cliente"}</p>
                <p className="text-xs text-gray-400">{selectedConv.phone}</p>
              </div>
              {selectedConv.status === "open" ? (
                <button
                  onClick={() => closeConversation(selectedConv.id)}
                  className="text-xs text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg"
                >
                  <XCircle size={14} className="inline mr-1" />
                  Cerrar
                </button>
              ) : (
                <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full">Cerrada</span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                      msg.direction === "outbound"
                        ? "bg-brand text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className={`text-[10px] mt-1 ${msg.direction === "outbound" ? "text-white/60" : "text-gray-400"}`}>
                      {new Date(msg.created_at).toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {selectedConv.status === "open" && (
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={sending || !replyText.trim()}
                    className="px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 transition-all"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 text-center">
                  {process.env.WHATSAPP_CLOUD_API_KEY ? "Respuesta enviada via WhatsApp Cloud API" : "Modo vista previa - conecta WhatsApp Cloud API"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
