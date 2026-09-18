"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { authStore } from "@/lib/auth/auth-store";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  company: string;
  role: string;
  avatar_url: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  signUp: (email: string, password: string, name: string, phone?: string, company?: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ error?: string }>;
  resetPassword: (newPassword: string) => Promise<{ error?: string }>;
  resendVerification: (email: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function translateError(message: string): string {
  const map: Record<string, string> = {
    "Invalid login credentials": "Correo o contraseña incorrectos",
    "Email not confirmed": "Debes confirmar tu correo electrónico antes de iniciar sesión",
    "User already registered": "Este correo ya está registrado",
    "Password should be at least 6 characters": "La contraseña debe tener al menos 6 caracteres",
    "Unable to validate email address: invalid format": "El correo electrónico no es válido",
    "New password should be different from the old password": "La nueva contraseña debe ser diferente a la anterior",
  };
  return map[message] || message;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(authStore.loadFromStorage() as AuthUser | null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (authUser: { id: string; email?: string | null; user_metadata?: Record<string, unknown> }) => {
    const c = createClient();
    const { data: profile } = await c
      .from("users")
      .select("name, phone, company, role, avatar_url")
      .eq("id", authUser.id)
      .single();

    const metaRole = (authUser.user_metadata as { role?: string })?.role;
    const dbRole = profile?.role || "customer";
    const role = metaRole === "vendedor" && dbRole === "customer" ? "vendedor" : dbRole;

    return {
      id: authUser.id,
      email: authUser.email || "",
      name: profile?.name || (authUser.user_metadata as { name?: string })?.name || "",
      phone: profile?.phone || "",
      company: profile?.company || "",
      role,
      avatar_url: profile?.avatar_url || "",
    };
  }, []);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) {
        fetchProfile(s.user).then((p) => {
          setUser(p);
          authStore.setUser(p);
        });
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s?.user) {
        fetchProfile(s.user).then((p) => {
          setUser(p);
          authStore.setUser(p);
        });
      } else if (_event === "SIGNED_OUT") {
        setUser(null);
        authStore.setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signIn = async (email: string, password: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: translateError(error.message) };

    if (data.user) {
      const profile = await fetchProfile(data.user);
      setUser(profile);
      setSession(data.session);
      authStore.setUser(profile);
    }
    return {};
  };

  const signUp = async (email: string, password: string, name: string, phone?: string, company?: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/verificar-email`,
      },
    });
    if (error) return { error: translateError(error.message) };

    if (data.user) {
      const updateData: Record<string, string> = { name };
      if (phone) updateData.phone = phone;
      if (company) updateData.company = company;

      await supabase.from("users").upsert({
        id: data.user.id,
        email: data.user.email,
        ...updateData,
      }, { onConflict: "id" });
    }
    return {};
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    authStore.setUser(null);
  };

  const forgotPassword = async (email: string) => {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/restablecer-contrasena`,
    });
    if (error) return { error: translateError(error.message) };
    return {};
  };

  const resetPassword = async (newPassword: string) => {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { error: translateError(error.message) };
    return {};
  };

  const refreshUser = useCallback(async () => {
    const supabase = createClient();
    const { data: { session: s } } = await supabase.auth.getSession();
    if (s?.user) {
      const profile = await fetchProfile(s.user);
      setUser(profile);
      authStore.setUser(profile);
      setSession(s);
    }
  }, [fetchProfile]);

  const resendVerification = async (email: string) => {
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/verificar-email`,
      },
    });
    if (error) return { error: translateError(error.message) };
    return {};
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, refreshUser, signUp, signIn, signOut, forgotPassword, resetPassword, resendVerification }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
