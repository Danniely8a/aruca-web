"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Users,
  BarChart3,
  Search,
  Filter,
  ChevronDown,
  RefreshCw,
  Trash2,
  Eye,
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ChatLog {
  id: string;
  session_id: string;
  role: "user" | "assistant";
  message: string;
  feedback: number;
  created_at: string;
}

interface ChatSession {
  id: string;
  session_id: string;
  started_at: string;
  ended_at: string | null;
  resolved: boolean;
  escalated_to_whatsapp: boolean;
  message_count?: number;
  last_message?: string;
}

interface KnowledgeEntry {
  id: string;
  question_pattern: string;
  answer: string;
  category: string;
  times_used: number;
  times_feedback_positive: number;
  times_feedback_negative: number;
  is_active: boolean;
}

interface Stats {
  totalSessions: number;
  todaySessions: number;
  totalMessages: number;
  positiveFeedback: number;
  negativeFeedback: number;
  unresolvedQuestions: number;
}

export default function ChatsPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "sessions" | "knowledge">("overview");
  const [stats, setStats] = useState<Stats>({
    totalSessions: 0,
    todaySessions: 0,
    totalMessages: 0,
    positiveFeedback: 0,
    negativeFeedback: 0,
    unresolvedQuestions: 0,
  });
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [sessionMessages, setSessionMessages] = useState<ChatLog[]>([]);
  const [knowledge, setKnowledge] = useState<KnowledgeEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    loadSessions();
    loadKnowledge();
  }, []);

  const loadStats = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [sessionsResult, messagesResult, feedbackPos, feedbackNeg, todayResult] = await Promise.all([
      supabase.from("chat_sessions").select("id", { count: "exact" }),
      supabase.from("chat_logs").select("id", { count: "exact" }),
      supabase.from("chat_logs").select("id", { count: "exact" }).eq("feedback", 1),
      supabase.from("chat_logs").select("id", { count: "exact" }).eq("feedback", -1),
      supabase.from("chat_sessions").select("id", { count: "exact" }).gte("started_at", today.toISOString()),
    ]);

    setStats({
      totalSessions: sessionsResult.count || 0,
      todaySessions: todayResult.count || 0,
      totalMessages: messagesResult.count || 0,
      positiveFeedback: feedbackPos.count || 0,
      negativeFeedback: feedbackNeg.count || 0,
      unresolvedQuestions: 0,
    });
  };

  const loadSessions = async () => {
    setLoading(true);
    const { data: sessionsData } = await supabase
      .from("chat_sessions")
      .select("*")
      .order("started_at", { ascending: false })
      .limit(100);

    if (sessionsData) {
      const sessionsWithCount = await Promise.all(
        sessionsData.map(async (s) => {
          const { count } = await supabase
            .from("chat_logs")
            .select("id", { count: "exact" })
            .eq("session_id", s.session_id);

          const { data: lastMsg } = await supabase
            .from("chat_logs")
            .select("message")
            .eq("session_id", s.session_id)
            .order("created_at", { ascending: false })
            .limit(1);

          return {
            ...s,
            message_count: count || 0,
            last_message: lastMsg?.[0]?.message || "",
          };
        })
      );
      setSessions(sessionsWithCount);
    }
    setLoading(false);
  };

  const loadSessionMessages = async (sessionId: string) => {
    setSelectedSession(sessionId);
    const { data } = await supabase
      .from("chat_logs")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (data) setSessionMessages(data);
  };

  const loadKnowledge = async () => {
    const { data } = await supabase
      .from("knowledge_base")
      .select("*")
      .order("category", { ascending: true });

    if (data) setKnowledge(data);
  };

  const updateKnowledgeEntry = async (id: string, updates: Partial<KnowledgeEntry>) => {
    await supabase.from("knowledge_base").update(updates).eq("id", id);
    loadKnowledge();
  };

  const deleteSession = async (sessionId: string) => {
    if (!confirm("¿Eliminar esta sesión y todos sus mensajes?")) return;
    await supabase.from("chat_logs").delete().eq("session_id", sessionId);
    await supabase.from("chat_sessions").delete().eq("session_id", sessionId);
    loadSessions();
    loadStats();
  };

  const filteredSessions = sessions.filter(
    (s) =>
      s.session_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.last_message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredKnowledge = knowledge.filter(
    (k) =>
      k.question_pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {[
          { id: "overview" as const, label: "Resumen", icon: BarChart3 },
          { id: "sessions" as const, label: "Sesiones", icon: MessageCircle },
          { id: "knowledge" as const, label: "Base de Conocimiento", icon: RefreshCw },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-brand text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={Users} label="Sesiones Totales" value={stats.totalSessions} color="brand" />
          <StatCard icon={Clock} label="Sesiones Hoy" value={stats.todaySessions} color="green" />
          <StatCard icon={MessageCircle} label="Mensajes Totales" value={stats.totalMessages} color="blue" />
          <StatCard icon={ThumbsUp} label="Buenas Respuestas" value={stats.positiveFeedback} color="green" />
          <StatCard icon={ThumbsDown} label="Malas Respuestas" value={stats.negativeFeedback} color="red" />
          <StatCard
            icon={BarChart3}
            label="Tasa de Satisfacción"
            value={
              stats.positiveFeedback + stats.negativeFeedback > 0
                ? Math.round((stats.positiveFeedback / (stats.positiveFeedback + stats.negativeFeedback)) * 100)
                : 0
            }
            suffix="%"
            color="purple"
          />
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === "sessions" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions List */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Sesiones ({filteredSessions.length})</h3>
            </div>
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredSessions.map((s) => (
                <button
                  key={s.session_id}
                  onClick={() => loadSessionMessages(s.session_id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                    selectedSession === s.session_id ? "bg-brand/5 border-l-2 border-brand" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-gray-500">
                      {s.session_id.slice(0, 16)}...
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(s.started_at).toLocaleDateString("es-VE")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 truncate">{s.last_message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">
                      {s.message_count} msgs
                    </span>
                    {s.escalated_to_whatsapp && (
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        WhatsApp
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Messages View */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            {selectedSession ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Conversación</h3>
                  <button
                    onClick={() => deleteSession(selectedSession)}
                    className="text-red-500 hover:text-red-600 p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {sessionMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                          msg.role === "user"
                            ? "bg-gray-100 text-gray-800 rounded-bl-md"
                            : "bg-brand text-white rounded-br-md"
                        }`}
                      >
                        <p>{msg.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] opacity-70">
                            {new Date(msg.created_at).toLocaleTimeString("es-VE", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {msg.feedback === 1 && <ThumbsUp size={10} className="text-green-300" />}
                          {msg.feedback === -1 && <ThumbsDown size={10} className="text-red-300" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
                <p>Selecciona una sesión para ver los mensajes</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Knowledge Base Tab */}
      {activeTab === "knowledge" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Patrón de Pregunta</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Respuesta</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Categoría</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">Usos</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">👍</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">👎</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">Activo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredKnowledge.map((k) => (
                    <tr key={k.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs text-brand">{k.question_pattern}</td>
                      <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{k.answer}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                          {k.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">{k.times_used}</td>
                      <td className="px-4 py-3 text-center text-green-600">{k.times_feedback_positive}</td>
                      <td className="px-4 py-3 text-center text-red-500">{k.times_feedback_negative}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => updateKnowledgeEntry(k.id, { is_active: !k.is_active })}
                          className={`w-10 h-5 rounded-full transition-colors ${
                            k.is_active ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`block w-4 h-4 rounded-full bg-white shadow transition-transform ${
                              k.is_active ? "translate-x-5" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            La base de conocimiento se usa automáticamente por el chatbot para mejorar sus respuestas.
            Edita las entradas directamente en Supabase para agregar nuevas respuestas.
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  color,
}: {
  icon: any;
  label: string;
  value: number;
  suffix?: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    brand: "bg-brand/10 text-brand",
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-500",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {value}{suffix}
      </p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
