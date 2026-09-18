import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SESSION_SECRET = process.env.SESSION_SECRET || "";
const RATE_LIMIT_STORE = new Map<string, { count: number; resetAt: number }>();

function getSecret(): Buffer {
  if (!SESSION_SECRET) {
    throw new Error("SESSION_SECRET no está configurado en .env.local");
  }
  return Buffer.from(SESSION_SECRET, "hex");
}

export function signSession(value: string): string {
  const timestamp = Date.now();
  const payload = `${value}.${timestamp}`;
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

export function unsignSession(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [value, timestamp, signature] = parts;
    const payload = `${value}.${timestamp}`;
    const expected = crypto
      .createHmac("sha256", getSecret())
      .update(payload)
      .digest("hex");

    if (!crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"))) {
      return null;
    }

    const age = Date.now() - parseInt(timestamp);
    if (age > 7 * 24 * 60 * 60 * 1000) return null;

    return value;
  } catch {
    return null;
  }
}

export function verifyAdminSession(request: NextRequest): boolean {
  const token = request.cookies.get("admin-session")?.value;
  if (!token) return false;
  return unsignSession(token) !== null;
}

export function verifyVendorSession(request: NextRequest): { email: string; name: string } | null {
  const token = request.cookies.get("vendor-session")?.value;
  if (!token) return null;

  const sessionData = unsignSession(token);
  if (!sessionData) return null;

  try {
    const parsed = JSON.parse(sessionData);
    if (!parsed.email || !parsed.name) return null;
    return { email: parsed.email, name: parsed.name };
  } catch {
    return null;
  }
}

export function requireAdmin(request: NextRequest): NextResponse | null {
  if (!verifyAdminSession(request)) {
    return NextResponse.json(
      { error: "No autorizado. Inicie sesión como administrador." },
      { status: 401 }
    );
  }
  return null;
}

export function requireVendor(request: NextRequest): NextResponse | null {
  const vendor = verifyVendorSession(request);
  if (!vendor) {
    return NextResponse.json(
      { error: "No autorizado. Inicie sesión como vendedor." },
      { status: 401 }
    );
  }
  return null;
}

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_STORE.get(key);

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_STORE.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function rateLimitByIp(
  request: NextRequest,
  limit: number,
  windowMs: number
): boolean {
  const ip = getClientIp(request);
  return rateLimit(ip, limit, windowMs);
}
