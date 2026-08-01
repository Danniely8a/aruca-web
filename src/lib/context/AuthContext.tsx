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
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => authStore.loadFromStorage());
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (authUser: { id: string; email?: string | null }) => {
    const c = createClient();
    const { data: profile } = await c
      .from("users")
      .select("name, phone, company, role")
      .eq("id", authUser.id)
      .single();

    return {
      id: authUser.id,
      email: authUser.email || "",
      name: profile?.name || "",
      phone: profile?.phone || "",
      company: profile?.company || "",
      role: profile?.role || "customer",
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
      } else {
        setUser(null);
        if (_event === "SIGNED_OUT") {
          authStore.setUser(null);
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signIn = async (email: string, password: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };

    if (data.user) {
      const profile = await fetchProfile(data.user);
      setUser(profile);
      setSession(data.session);
      authStore.setUser(profile);
    }
    return {};
  };

  const signUp = async (email: string, password: string, name: string) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    if (error) return { error: error.message };
    return {};
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    authStore.setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
