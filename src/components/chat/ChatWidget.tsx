"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, ThumbsUp, ThumbsDown, Bot, User } from "lucide-react";

interface Message {
  id?: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
  feedback?: number;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("chat_session_id") || (() => {
        const id = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("chat_session_id", id);
        return id;
      })();
    }
    return "";
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      role: "user",
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text, sessionId }),
      });

      const data = await response.json();

      if (data.reply) {
        const assistantMessage: Message = {
          role: "assistant",
          text: data.reply,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Error de conexión. Por favor intenta de nuevo o escríbenos por WhatsApp.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, sessionId]);

  const handleFeedback = async (messageIndex: number, feedback: number) => {
    const msg = messages[messageIndex];
    if (!msg || msg.role !== "assistant") return;

    setMessages((prev) =>
      prev.map((m, i) => (i === messageIndex ? { ...m, feedback } : m))
    );

    try {
      await fetch("/api/chat/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId: msg.id, feedback, sessionId }),
      });
    } catch {
      // Silent fail
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-brand hover:bg-brand/90"
        }`}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-brand text-white px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">ARUCA Asistente</h3>
              <p className="text-xs text-white/70">Siempre disponible para ayudarte</p>
            </div>
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-brand/10 flex items-center justify-center">
                  <Bot size={32} className="text-brand" />
                </div>
                <p className="font-semibold text-gray-800 mb-1">¡Hola! Soy el asistente de ARUCA</p>
                <p className="text-sm text-gray-500 mb-4">Puedo ayudarte con información sobre productos, cotizaciones y más.</p>
                <div className="space-y-2">
                  {["¿Qué marcas manejan?", "Necesito una cotización", "¿Dónde están ubicados?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); }}
                      className="block w-full text-left px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-brand hover:text-brand transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] ${msg.role === "user" ? "order-2" : ""}`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-brand text-white rounded-br-md"
                        : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Bot size={12} className="text-brand" />
                        <span className="text-[10px] font-semibold text-brand uppercase tracking-wide">ARUCA Bot</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>

                  {/* Feedback buttons for assistant messages */}
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-1.5 mt-1 ml-1">
                      <button
                        onClick={() => handleFeedback(i, msg.feedback === 1 ? 0 : 1)}
                        className={`p-1 rounded transition-colors ${
                          msg.feedback === 1
                            ? "text-green-600 bg-green-50"
                            : "text-gray-400 hover:text-green-600"
                        }`}
                        title="Buena respuesta"
                      >
                        <ThumbsUp size={12} />
                      </button>
                      <button
                        onClick={() => handleFeedback(i, msg.feedback === -1 ? 0 : -1)}
                        className={`p-1 rounded transition-colors ${
                          msg.feedback === -1
                            ? "text-red-500 bg-red-50"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                        title="Mala respuesta"
                      >
                        <ThumbsDown size={12} />
                      </button>
                      <span className="text-[10px] text-gray-400">
                        {new Date(msg.timestamp).toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex items-center gap-1.5">
                    <Bot size={12} className="text-brand" />
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100 bg-white">
              <div className="flex gap-2 overflow-x-auto">
                <a
                  href={`https://wa.me/584126109597?text=${encodeURIComponent("Hola, vengo del chat de ARUCA Maquinarias")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-3 py-1.5 text-xs font-medium bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href="/cotizacion"
                  className="flex-shrink-0 px-3 py-1.5 text-xs font-medium bg-brand/10 text-brand rounded-full hover:bg-brand/20 transition-colors"
                >
                  Cotización
                </a>
                <a
                  href="/catalogo"
                  className="flex-shrink-0 px-3 py-1.5 text-xs font-medium bg-orange-100 text-accent-orange rounded-full hover:bg-orange-200 transition-colors"
                >
                  Catálogo
                </a>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100 bg-white">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta..."
                rows={1}
                className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                style={{ minHeight: "42px", maxHeight: "100px" }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5 text-center">
              Powered by AI — ARUCA Maquinarias © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
