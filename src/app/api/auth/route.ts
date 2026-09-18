import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { signSession, unsignSession, rateLimitByIp, getClientIp } from "@/lib/auth";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@arucamaquinarias.com";
const PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";

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

  if (email !== ADMIN_EMAIL) {
    recordAttempt(ip);
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, PASSWORD_HASH);
  if (!valid) {
    recordAttempt(ip);
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  LOGIN_ATTEMPTS.delete(ip);

  const sessionId = crypto.randomUUID();
  const token = signSession(sessionId);

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get("admin-session")?.value;
  if (!token || !unsignSession(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin-session");
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
