import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { vendorNameByEmail } from "@/lib/vendors";
import { signSession, unsignSession, rateLimitByIp, getClientIp } from "@/lib/auth";

const LOGIN_ATTEMPTS = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60 * 1000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  const attempt = LOGIN_ATTEMPTS.get(ip);
  if (attempt && attempt.count >= MAX_ATTEMPTS && Date.now() < attempt.resetAt) {
    const remaining = Math.ceil((attempt.resetAt - Date.now()) / 1000);
    return NextResponse.json(
      { error: `Demasiados intentos. Intente de nuevo en ${remaining} segundos.` },
      { status: 429 }
    );
  }

  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error || !data.user) {
    recordAttempt(ip);
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  const vendorEmail = data.user.email || email.trim().toLowerCase();
  const vendorName = vendorNameByEmail(vendorEmail);

  if (!vendorName) {
    await supabase.auth.signOut();
    recordAttempt(ip);
    return NextResponse.json(
      { error: "El usuario no pertenece al portal de vendedores" },
      { status: 403 }
    );
  }

  LOGIN_ATTEMPTS.delete(ip);

  const sessionData = JSON.stringify({ email: vendorEmail, name: vendorName });
  const token = await signSession(sessionData);

  response.cookies.set("vendor-session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12,
    path: "/",
  });

  return response;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("vendor-session")?.value || "";

  const sessionData = await unsignSession(token);
  if (!sessionData) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  let email = "";
  let name = "";
  try {
    const parsed = JSON.parse(sessionData);
    email = parsed.email || "";
    name = parsed.name || "";
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, email, name });
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get("vendor-session")?.value;
  if (!token || !(await unsignSession(token))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete("vendor-session");
  return response;
}

function recordAttempt(ip: string) {
  const entry = LOGIN_ATTEMPTS.get(ip);
  if (!entry || Date.now() > entry.resetAt) {
    LOGIN_ATTEMPTS.set(ip, { count: 1, resetAt: Date.now() + LOCKOUT_MS });
  } else {
    entry.count++;
  }
}
